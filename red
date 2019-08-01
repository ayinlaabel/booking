<% if (errors.length) { %>
    <% errors.forEach((error) =>{ %>
    <div class="alert alert-danger">
      <%= error.msg %>
    </div>
    <% }); %>
  <% } %> 

  
      
      let newDoc = await Doctor.find({email: req.body.email});

      if (newDoc) {
        return res.status(400).send('User Already Exists!');





    passport.use('user-local', new LocalStrategy( {
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done) => {
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

    passport.use('doctor-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(username, password, done) => {
        //Match User
        let query = {username : username};
        
        Doctor.findOne(query, (err, user) =>{
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
            return done(null, user);
        });
    }));