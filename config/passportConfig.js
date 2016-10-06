var User = require('../models/user').User;
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app){

  app.use(passport.initialize());
  app.use(passport.session()); //sets http requests to include session

  passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'User not found.' });
        }
        if (!isValidPassword(user, password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);  // defines user field for any passport functions
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  function isValidPassword(user, password){
    return bcrypt.compareSync(password, user.password);
  }

};