const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport')
const bcrypt = require('bcryptjs');


//Bring In Patient Model
const Patient = require('../model/patients');

const routes = express.Router();

routes.get('/patient', (req, res, errors) =>{
    res.render('patientReg', {
        errors:errors
    });
});
routes.post('/patient', (req, res) =>{
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

routes.get('/patient/login', (req, res) =>{
    res.render('patientLogin');
});

routes.post('/patient/login', (req, res, next) =>{
    passport.authenticate('patient-local', {
        successRedirect: '/hospital/patient/dashboard',
        failureRedirect: '/hospital/patient/login',
        failureFlash: true
    })(req, res, next);
});

routes.get('/patient/dashboard', (req, res) =>{
    res.render('patientDashboard');
});

module.exports = routes