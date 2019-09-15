const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../model/signup');
const Patient = require('../model/patients');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

module.exports = (passport) => {
    //Local Strategy

    //Admin Login Passport Authentication
    passport.use('user-local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password' // this is the virtual field on the model
    },
    function(username, password, done) {
      Admin.findOne({
        username: username 
      }, function(err, user) {
        if (err) return done(err);

        if (user) {
          bcrypt.compare(password, user.password, (err, isMatch) =>{
            if (err) throw err;
  
            if (!isMatch) {
              return done(null, false, {message: 'Password Dont Match'});
            } else{
              return done(null, user);
            }
        });
        }else{

          return done(null, false, {message: 'User Not Found'});
        }
        

        
      });
    }
  ));

    //Serialize User
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    //Deserialize User
    passport.deserializeUser((id, done) => {
      Admin.findById(id, (err, user) => {
        done(err, user);
      });
    });
}
