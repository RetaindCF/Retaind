var express = require('express');
var User = require(__dirname + '/../models/user');
var jsonParser = require('body-parser').json();
var handleError = require(__dirname + '/../lib/handle_error');
var httpBasic = require(__dirname + '/../lib/http_basic');
var app = express();
var path = require('path');
var usersRouter = module.exports = exports = express.Router();
var EventEmitter = require('events');
var ee = new EventEmitter();
var mailGun = require(__dirname + '/../mailgun');


usersRouter.post('/user_token', jsonParser, function(req,res) {
  console.log(req.body);
 /*User.findOne({}, function(err, doc){
    //console.log(doc);
   }); */
 res.end();
});

usersRouter.post('/token', jsonParser, function(req,res) {
  console.log(req.body);
  User.findOne({"basic.username": req.body.username}, function(err, obj) {
    console.log(obj);
    res.json(obj);
  })
});

usersRouter.post('/login', jsonParser, function(req, res) {
  if(req.body.token){
    //res.end();
    return res.redirect("/dashboard.html");
  }
  var newUser = new User();
  newUser.basic.username = req.body.username;
  newUser.username = req.body.username;
  newUser.generateHash(req.body.password, function(err, hash){
    ee.emit('generateHash', res, err, newUser);
  });
});

ee.on('generateHash', function(res, err, newUser) {
  if (err) return handleError(err, res);
  newUser.save(function(err, data) {
    newUser.generateToken(function(err, token) {
      if (err) return handleError(err, res);
      mailGun.newAccount(newUser);
      res.json({token: token, tokenid: token._id});
    });
  });
});

usersRouter.get('/signin', httpBasic, function(req, res) {
  User.findOne({'basic.username': req.auth.username}, function(err, user) {
    if (err) return handleError(err, res);
    if(!user) {
      console.log('Could not find user in db: ' + req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    ee.emit('compareHash', req, res, user);
  });
});

ee.on('compareHash', function(req, res, user) {
  user.compareHash(req.auth.password, function(err, hashRes) {
    if (err) return handleError(err, res);
    if(!hashRes) {
      console.log('Hash result missing for: ' +req.auth.username);
      return res.status(401).json({msg: 'could not authenticate'});
    }
    ee.emit('generateToken', res, user);
  });
});

ee.on('generateToken', function(res, user) {
  user.generateToken(function(err, token) {
    if (err) return handleError(err, res);
    res.json({token: token});
  });
});
