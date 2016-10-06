var express = require('express');
var router = express.Router();
var users = require('./users');
var notes = require('./notes');
var session = require('./session');
var signup = require('./signup');

/*Public functions*/
router.use('/session', session);
router.use('/signup', signup);

/*Private functions*/
router.use(loggedIn);
router.use('/users', users);
router.use('/notes', notes);

///* GET home page. */
//router.get('/', function(req, res) {
//  res.render('index', { title: 'Express' });
//});

function loggedIn(req, res, next) {
  if (req.user) {                             // where does user come from

    console.log("User logged in");
    next();
  } else {
    console.log("User not logged in");
    res.json(500, {message: "User not logged in"});
  }
}

module.exports = router;
