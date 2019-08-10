const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bcrypt = require('bcryptjs');


//Bring In Patient Model
const Patient = require('../model/patients');

const router = express.Router();

router.get('/dashboard', (req, res) =>{
    res.render('patientDashboard');
});

router.get('/', (req, res, errors) =>{
    res.render('patientReg', {
        errors:errors
    });
});
router.post('/', (req, res) =>{
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const gender = req.body.gender;
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
        let newPatient = new Patient({
            name:name,
            lastname:lastname,
            email:email,
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
            bcrypt.hash(newPatient.password, salt, (err, hash) =>{
                if (err) {
                    console.log(err);
                }
                newPatient.password = hash;
                newPatient.save((err) => {
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



router.get('/checkAppointment', ensureAuthenticated, (req, res) => {
    res.render('makeAppointment');
});
<<<<<<< HEAD
router.get('/makeAppointment',  (req, res) => {
=======
router.get('/makeAppointment', (req, res) => {
>>>>>>> ab00bd9bb1bac23d282ab00ffc336f0f5c534c11
    res.render('makeAppointment');
});

router.get('/login', (req, res) =>{
    res.render('patientLogin');
});



router.post('/login', (req, res, next) =>{
    passport.authenticate('patient-local', {
        successRedirect: '/hospital/patient/dashboard',
        failureRedirect: '/hospital/patient/login',
        failureFlash: true
    })(req, res, next);
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'User Not Login, Please Login');
        res.redirect('/hospital/patient/login');
    }
}

module.exports = router