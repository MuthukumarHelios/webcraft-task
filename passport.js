var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var {user} = require('./models/users.js');
console.log("passport js");
passport.use(new LocalStrategy(
    
   async function(email, password, done) {      
    try{
    
      var user = await user.findOne({ email:"muth@gmail.com" })
       console.log(user);
      if(user) {done(null, user);}
     else{done(null, "user")}
     
    }catch(e){
       return done(null, e);
    }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });