const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/signup');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

module.exports = (passport) => {
    //Local Strategy
    passport.use(new LocalStrategy((username, password, done) => {
        //Match User
        let query = {username : username};

        User.findOne(query, (err, user) =>{
            if(err) throw err;

            if(!user){
                return done (null, false, {message: 'No User Found'});
            }
            console.log(user)
            //match Password
            bcrypt.compare(password, user.password, (err, isMatch) =>{
                if (err) throw err;

                if (isMatch) {
                    return done(null, user);
                } else{
                    return done(null, false, {message: 'Password Dont Match'});
                }
            });
        });
    }));

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
