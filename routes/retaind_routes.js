var eatAuth = require(__dirname + '/../lib/eat_auth');
var express = require('express');
var User = require(__dirname + '/../models/user');
var retaindRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var addToDb = require(__dirname + '/../lib/add_to_db');
var time = require(__dirname + '/../lib/time');


// Accepts a JSON object like: {pInfo: {fullName: 'Bert Mert',email: 'b.mert@pert.com',phone: '3603603600',location: 'Seattle, WA',timezone: 'PST (UTC−08:00)',currentLogin: 'the token?'}}
// Stores JSON object in an array. can access with user.pInfo[0]
retaindRoute.post('/personal', jsonParser, eatAuth, function(req, res) {
  // Third parameter is the thing you want to push into the document array
  addToDb(req, res, {pInfo: req.body.pInfo});
});

retaindRoute.get('/personal', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.pInfo);
  });
});

retaindRoute.post('/remove-user', jsonParser, eatAuth, function(req, res) {
  debugger;
  User.find({ username: req.user.username }).remove().exec();
  return res.end();
});

retaindRoute.post('/ambition', jsonParser, eatAuth, function(req, res) {
  var dueDate = time.plusWeek();
  var input = {ambition: req.body.ambitions, dueDate: dueDate};
  addToDb(req, res, {ambitions: input});
});

retaindRoute.get('/ambition', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.ambitions);
  });
});

retaindRoute.post('/dashload', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.ambitions);
  });
});

retaindRoute.post('/LDR', jsonParser, eatAuth, function(req, res) {
  addToDb(req, res, {LDR: req.body.LDR});
});

retaindRoute.get('/LDR', jsonParser, eatAuth, function(req, res) {
  User.findOne({ username: req.user.username }, function(err, doc) {
    if (err) handleError(err);
    res.json(doc.LDR);
  });
});

retaindRoute.put('/change_remindr', jsonParser, function(req, res) {
  console.log(req.body);
});

retaindRoute.get('/user_info', jsonParser, eatAuth, function(req, res) {
  User.findOne( {username: req.user.username}, function(doc) {
    res.json(doc);
  });
});