const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const router = express.Router();

//Bring in Models
const pendingDoc = require('../model/pendingDoc');
const User = require('../model/signup');

router.get('/application', (req, res, errors) => {
    res.render('doctorApplication', {
      errors: errors
    });
});

router.post('/application', async (req, res)=>{
    const name = req.body.name;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const dob = req.body.dob;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zipcode = req.body.zipcode;
    const password = req.body.password; 
    const passwordC = req.body.passwordC;
    
    
    req.checkBody('name', 'Name is Required').notEmpty();
    req.checkBody('lastname', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'email is Required').notEmpty();
    req.checkBody('address1', 'Atlest one Address is Required').notEmpty();
    req.checkBody('city', 'City is Required').notEmpty();
    req.checkBody('state', 'State is Required').notEmpty();
    req.checkBody('zipcode', 'Zipcode is Required').notEmpty();
    req.checkBody('password', 'password is Required').notEmpty();
    req.checkBody('passwordC', 'password is Required').equals(req.body.password);
  
    let errors = req.validationErrors();
  
        if (errors) {
        res.render('doctorApplication', {
            errors:errors,
        });
        }else {
      let newPendingDoc = new pendingDoc({
        name:name,
        lastName:lastname,
        email:email,
        dob:dob,
        address1:address1,
        address2:address2,
        city:city,
        state:state,
        zipcode:zipcode,
        password:password
      });

      newPendingDoc.save((err) => {
        if (err) {
            console.log(err);
        } else {
          req.flash('success', 'Application Send Successfully');
          res.redirect('/');
        }
      });
      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(newPendingDoc.password, salt, (err, hash) => {
      //       if (err) {
      //           console.log(err);
      //       }
      //       newPendingDoc.password = hash;
      //       newPendingDoc.save((err) => {
      //           if (err) {
      //               console.log(err);
      //           } else {
      //             req.flash('success', 'Application Send Successfully');
      //             res.redirect('/');
      //           }
      //       });
      //   });
      // });
    }
  });

  router.get('/login', (req, res) => {
    res.render('docLogin');
  });

  router.post('/login', (req, res, next) =>{
    passport.authenticate('doctor-local', {
        successRedirect: '/doctors/dashboard',
        failureRedirect: '/doctors/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout Successful');
  res.redirect('/doctors/login');
});

router.get('/dashboard', (req, res) =>{
  res.render('docDashboard')
});

router.get('/patient/register', (req, res) =>{
  res.render('patientReg')
});

router.post('/patient/register', (req, res) =>{
  
});


module.exports = router;