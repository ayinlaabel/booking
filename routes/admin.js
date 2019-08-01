const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//bring in admin
const User = require('../model/signup');
const pendingDoc = require('../model/pendingDoc');
const Doctor = require('../model/doctors');


router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    
    req.checkBody('username', 'username is Required').notEmpty();
    req.checkBody('password', 'password is Required').notEmpty();
  
    let errors = req.validationErrors();
  
        if (errors) {
        console.log(errors)
        res.render('signup', {
            errors:errors,
        });
        } else {
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
    }
  });

router.get('/login', (req, res) => {
    res.render('adminLogin');
});

router.post('/login', (req, res, next) =>{
    passport.authenticate('user-local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logout Successful');
  res.redirect('/admin/login');
});


router.get('/dashboard', (req, res) => {
    res.render('admin');
});

router.get('/add_doctor', (req, res) => {
  pendingDoc.find({}, (err, pendingDocs) =>{
    if (err) {
      console.log(err);
    } else {
      res.render('application', {
        pendingDocs: pendingDocs
      });
    }
  })
});

router.get('/doctor/:id', (req, res) => {
  pendingDoc.findById(req.params.id, (err, doc) =>{
    res.render('add_doctor', {
      doc:doc
    });
  })
});

router.post('/add_doctor', async (req, res)=>{
  const name = req.body.name;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const username = req.body.email;
  const dob = req.body.dob;
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  const city = req.body.city;
  const state = req.body.state;
  const zipcode = req.body.zipcode;
  const password = req.body.password; 
  // const passwordC = req.body.passwordC;
  
  // console.log(name);
  req.checkBody('name', 'Name is Required').notEmpty();
  req.checkBody('lastname', 'Last Name is Required').notEmpty();
  req.checkBody('email', 'email is Required').notEmpty();
  req.checkBody('address1', 'Atlest one Address is Required').notEmpty();
  req.checkBody('city', 'City is Required').notEmpty();
  req.checkBody('state', 'State is Required').notEmpty();
  req.checkBody('zipcode', 'Zipcode is Required').notEmpty();
  req.checkBody('password', 'password is Required').notEmpty();
  // req.checkBody('passwordC', 'password is Required').equals(req.body.password);

  let errors = req.validationErrors();

      if (errors) {
      console.log(errors)
      res.render('add_doctor', {
          errors:errors,
      });
      } else {
        let newDoc = new Doctor({
        name:name,
        lastName:lastname,
        email:email,
        username:username,
        dob:dob,
        address1:address1,
        address2:address2,
        city:city,
        state:state,
        zipcode:zipcode,
        password:password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newDoc.password, salt, (err, hash) => {
          if (err) {
              console.log(err);
          }
          newDoc.password = hash;
          newDoc.save((err) => {
              if (err) {
                  console.log(err);
              } else {
                req.flash('success', 'Acception Letter Sent');
                res.redirect('/admin/add_doctor');
              }
          });
      });
    });
  }
});


router.delete('/doctor/:id', (req, res) =>{
  let query = {_id:req.params.id};

  pendingDoc.remove(query, (err) =>{
    if (err) {
      console.log(err);
    } 
    res.send('success');
  });
});
module.exports = router;