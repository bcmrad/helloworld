'use strict';

var Note = require('../models/note').Note;

exports.create = function(req, res){
  var newNote = new Note();
  newNote.title = req.body.title;
  newNote.body = req.body.body;
  newNote.creatorID = req.user._id;
  newNote.latitude = req.body.latitude;
  newNote.longitude = req.body.longitude;
  //if(req.body.location) {
  //  newNote.location = req.body.location;
  //}

  newNote.save(function(err){
    if(!err) {
      res.json(201, {message: "Note created with title: " + newNote.title });
    } else {
      res.json(500, {message: "Could not create note. Error: " + err});
    }
  });
};

exports.getNote = function(req, res){
  var id = req.params.id;      //This comes from url parameter
  Note.findById(id, function(err, doc){
    if(!err && doc) {
      res.json(200, doc);
    } else if(err) {
      res.json(500, {message: 'Error loading note. ' + err});
    } else {
      res.json(404, {message: "Note not found."});
    }
  });
};

exports.delete = function(req, res){
  var id = reg.params.id;
  Note.findById(id, function(err, doc){
    if(!err && doc) {
      doc.remove();
      res.json(200, {message: "Note deleted."});
    } else if(!err) {
      res.json(404, {message: 'Could not find note.'});
    } else {
      res.json(403, {message: "Could not delete note. " + err});
    }
  });
};

exports.update = function(req, res){
  var id = req.body.id;             //This comes from json body
  Note.findById(id, function(err, doc){
    if(!err && doc) {
      doc.title = req.body.title || doc.title;
      doc.body = req.body.body || doc.body;
      doc.date_created = req.body.date_created || doc.date_created;
      doc.votes = req.body.votes || doc.votes;
      doc.creatorID = req.body.creatorID || doc.creatorID;
      doc.latitude = req.body.latitude || doc.latitude;
      doc.longitude = req.body.longitude || doc.longitude;
      doc.location = req.body.location || doc.location;
      doc.visibility = req.body.visibility || doc.visibility;
      doc.save(function(err){
        if(!err){
          res.json(200, doc);
        } else{
          res.json(500, {message: 'Could not update note. ' + err});
        }
      });
    } else if(!err) {
      res.json(404, {message: "Note not found."});
    } else {
      res.json(500, {message: 'Could not update note. ' + err});
    }
  });
};

exports.vote = function(req, res){
  var id = req.body.id;             //This comes from json body
  Note.findById(id, function(err, doc){
    if(!err && doc) {
      doc.votes += req.body.vote; //Client sends vote as +1 or -1
      doc.save(function(err){
        if(!err){
          res.json(200, doc);
        } else{
          res.json(500, {message: 'Could not update note. ' + err});
        }
      });
    } else if(!err) {
      res.json(404, {message: "Note not found."});
    } else {
      res.json(500, {message: 'Could not update note. ' + err});
    }
  });
};

exports.index = function(req, res) {
  console.log("get notes");
  Note.find({}, function(err, docs) {
    if(!err) {
      res.json(200, { notes: docs });
    } else {
      res.json(500, { message: err });
    }
  });
};