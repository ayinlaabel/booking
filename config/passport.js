const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/signup');
const Doctor = require('../model/doctors');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

module.exports = (passport) => {
    //Local Strategy
    passport.use('user-local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done) {
      User.findOne({
        username: username
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, {
            message: 'This email is not registered.'
          });
        }

        bcrypt.compare(password, user.password, (err, isMatch) =>{
          if (err) throw err;

          if (isMatch) {
              return done(null, user);
          } else{
              return done(null, false, {message: 'Password Dont Match'});
          }
      });
      });
    }
  ));

    // add other strategies for more authentication flexibility
    passport.use('doctor-local', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password' // this is the virtual field on the model
        },
        function(email, password, done) {
            Doctor.findOne({
                email: email
            }, function(err, doctor) {
                if (err) return done(err);

                if (!doctor) {
                    return done(null, false, {
                        message: 'This email/username is not registered.'
                    });
                }
                bcrypt.compare(password, doctor.password, (err, isMatch) =>{
                  if (err) throw err;
  
                  if (isMatch) {
                      return done(null, doctor);
                  } else{
                      return done(null, false, {message: 'Password Dont Match'});
                  }
              });
            });
        }
    ));

    //Serialize User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Deserialize User
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
}
