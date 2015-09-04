'use strict';

var User = require('../models/user').User;

exports.create = function(req,res){
  console.log("Creating User");
  var newUser = new User();
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.userName = req.body.userName;
  newUser.passWord = req.body.passWord;
  newUser.email = req.body.email;
  newUser.secStatus = req.body.secStatus || 'user';

  newUser.save(function(err){
    if(!err) {
      res.json(201, {message: "User created: " + newUser.firstName + newUser.lastName });
    } else {
      res.json(500, {message: "Could not create user. Error: " + err});
    }
  });
}

exports.getUser = function(req, res){
  console.log("Get User: " + req.params.id);
  var id = req.params.id;      //This comes from url parameter
  User.findById(id, function(err, doc){
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, {message: 'Error loading user. ' + err});
    } else {
      res.json(404, {message: "User not found."});
    }
  });
}

exports.delete = function(req, res){
  console.log("Deleting User");
  var id = req.params.id;
  User.findById(id, function(err, doc){
    if(!err && doc) {
      doc.remove();
      res.json(200, {message: "User deleted."});
    } else if(!err) {
      res.json(404, {message: 'Could not find user.'});
    } else {
      res.json(403, {message: "Could not delete user. " + err});
    }
  });
}


exports.update = function(req, res){
  var id = req.body.id;             //This comes from json body
  console.log("Update User: " + id);
  User.findById(id, function(err, doc){
    if(!err && doc) {
      doc.firstName = req.body.firstName || doc.firstName;
      doc.lastName = req.body.lastName || doc.lastName;
      doc.ownNotes = req.body.ownNotes || doc.ownNotes;
      doc.favouriteNotes = req.body.favouriteNotes || doc.favouriteNotes;
      doc.userName = req.body.userName || doc.userName;
      doc.passWord = req.body.passWord || doc.passWord;
      doc.friends = req.body.friends || doc.friends;
      doc.email = req.body.email || doc.email;
      doc.acctStatus = req.body.acctStatus || doc.acctStatus;
      doc.secStatus = req.body.secStatus || doc.secStatus;
     // doc.settings = reg.body.settings  || doc.settings;
      doc.save(function(err){
        if(!err){
          res.json(200, doc);
        } else{
          res.json(500, {message: 'Could not update user. ' + err});
        }
      });
    } else if(!err) {
      res.json(404, {message: "User not found."});
    } else {
      res.json(500, {message: 'Could not update user. ' + err});
    }
  });
}

exports.index = function(req, res) {
  console.log("Get all users.");
  User.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { users: docs });
    } else {
      res.json(500, { message: err });
    }
  });
}