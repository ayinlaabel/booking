const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const routes = express.Router();

//bring in admin
const User = require('../model/signup');

routes.get('/signup', (req, res) => {
    res.render('signup');
});

routes.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    
    // req.checkBody('username', 'username is Required').notEmpty();
    // req.checkBody('password', 'password is Required').notEmpty();
  
    // let errors = req.validationErrors();
  
        // if (errors) {
        // console.log(errors)
        // res.render('signup', {
        //     errors:errors,
        // });
        // } else {
      let newUser = new User({
        username:username,
        password:password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                console.log(err);
            }
            newUser.password = hash;
            newUser.save((err) => {
                if (err) {
                    console.log(err);
                } else {
                  req.flash('success', 'Registration Complete please Login!');
                  res.redirect('/admin/login');
                }
            });
        });
      });
    // }
  });

routes.get('/login', (req, res) => {
    res.render('adminLogin');
});

routes.post('/login', (req, res, next) =>{
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
});

routes.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout Successful');
  res.redirect('/');
});


routes.get('/dashboard', (req, res) => {
    res.render('admin');
});

module.exports = routes;