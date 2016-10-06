var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var session = require('express-session');


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/helloworld/data'); //connects our app to a local mongoDB

var app = express();

// view engine setup (Not a concern for server)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'whaddyalookinat', cookie: {maxAge: 1000 * 60 * 30}}));
require('./config/passportConfig')(app);  // calls the config file, because the exports is a function (app) is passed as
                                          // a parameter

app.use('/api/', routes);   // use api index page -> handles api pages
//app.use(function (req, res) { //NECESSARY - sends request back to frontend if not an api call
//    res.sendFile(path.join(__dirname, '/public/index.html'));
//});
//
//
//// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
