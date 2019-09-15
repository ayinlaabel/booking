const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')
const bcrypt = require('bcryptjs');


//Bring In Patient Model
const User = require('../model/signup');
const Appointment = require('../model/appointment');


router.get('/', (req, res, errors) =>{
    res.render('patientReg', {
        errors:errors
    });
});
router.post('/', (req, res) =>{
    const name = req.body.name;
    const lastname = req.body.lastname;
    const username = req.body.lastname;
    const email = req.body.email;
    const gender = req.body.gender;
    const position = req.body.position;
    const tel = req.body.tel;
    const dob = req.body.dob;
    const country = req.body.country;
    const address = req.body.address;
    const city = req.body.city;
    const zipcode = req.body.zipcode;
    const password = req.body.password;
    const passwordC = req.body.passwordC;


    req.checkBody('name', 'Name is Required').notEmpty();
    req.checkBody('lastname', 'Name is Required').notEmpty();
    req.checkBody('email', 'Name is Required').notEmpty();
    req.checkBody('tel', 'Name is Required').notEmpty();
    req.checkBody('address', 'Name is Required').notEmpty();
    req.checkBody('city', 'Name is Required').notEmpty();
    req.checkBody('zipcode', 'Name is Required').notEmpty();
    req.checkBody('password', 'Name is Required').notEmpty();
    req.checkBody('passwordC', 'Name is Required').equals(req.body.password);
    req.checkBody('email', 'Email Required {example@example.com)').isEmail();

    let errors = req.validationErrors();

    if (errors) {
        res.render('patientReg', {
            errors:errors
        });
    } else{
        let user = new User({
            name:name,
            lastname:lastname,
            username:username,
            email:email,
            position:position,
            gender:gender,
            tel:tel,
            dob:dob,
            country:country,
            address:address,
            city:city,
            zipcode:zipcode,
            password:password,
        });
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, (err, hash) =>{
                if (err) {
                    console.log(err);
                }
                user.password = hash;
                user.save((err) => {
                    if (err) {
                        console.log(err);
                    } else {
                      req.flash('success', 'Registration Successful You can now Login');
                      res.redirect('/hospital/patient/login');
                    }
                });
            })
        })
    }
});

router.get('/login', (req, res) =>{
    res.render('patientLogin');
});

router.get('/make-appointment-with-a-doctor', ensureAuthenticated, (req, res) =>{
    res.render('makeAppointment')   
});

router.post('/view-appointment-make', ensureAuthenticated,(req, res) =>{
    let appointment = new Appointment();
    // appointment.name = req.user._id;
    appointment.city = req.body.city;
    appointment.service = req.body.service;
    appointment.date = req.body.date;
    appointment.time = req.body.time;
    appointment.comment = req.body.comment;

    console.log(req.body.time);
    appointment.save((err) =>{
        if (err) {
            console.log(err);
        } else {
            req.flash('success', 'Your Appointment as been Sent Successfully');
            res.redirect('/hospital/patient/view-appointment-make');
        }
    });
});

router.get('/view-appointment-make', ensureAuthenticated, (req, res)=>{
    Appointment.find({}, (err, appointments) =>{
        if (err) {
            console.log(err);
        } else {
            Appointment.findById(req.params.id, (err, appointment) =>{
                res.render('viewAppointment', {
                    appointments: appointments,
                    // appointment: appointment
                });
            })
        }
    });
});

router.get('/view-appointment-details-:id', ensureAuthenticated, (req, res) =>{
    Appointment.findById(req.params.id, (err, appointment) => {
        if (err) {
            console.log(err);
        } else {
            res.render('viewMe', {
                appointment:appointment
            });
        }
    })
});

router.get('/view-appointment-check-:id', ensureAuthenticated, (req, res) =>{
    Appointment.findById(req.params.id, (err, appointment) => {
        if (err) {
            console.log(err);
        } else {
            res.render('deleteMe', {
                appointment:appointment
            });
        }
    })
});

router.delete('/view-appointment-check-:id', ensureAuthenticated, (req, res) =>{
    let query = {_id:req.params.id};
  
    Appointment.remove(query, (err) =>{
      if (err) {
        console.log(err);
      } 
      res.send('success');
    });
  });

router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    res.render('patientDashboard');
});


router.post('/login', (req, res, next) =>{
    passport.authenticate('user-local', {
        successRedirect: '/hospital/patient/dashboard',
        failureRedirect: '/hospital/patient/login',
        failureFlash: true
    })(req, res, next);
});


router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'Logout Successful');
    res.redirect('/hospital/patient/login');
  });





//Router Authenticated
function ensureAuthenticated(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      req.flash('danger', 'You are require to login');
      res.redirect('/hospital/patient/login');
    }
  }

  function login(req, res, next){
    if (user.position === 'patient') {
      return next();
    } else {
      req.flash('danger', 'You are require to login');
      res.redirect('/hospital/patient/login');
    }
  }

module.exports = router