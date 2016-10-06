var express = require('express');
var router = express.Router();
var passport = require('passport');


router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json(500, info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(200, {message: 'login successful', user: filterUser(user)});
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  console.log("logging out");
  res.json(200, {message: 'Logging out'});
  req.logout();
});

function filterUser(userJSON){
  var filtered = userJSON;
  filtered._id = undefined;
  filtered.password = undefined;
  return filtered;
}




module.exports = router;