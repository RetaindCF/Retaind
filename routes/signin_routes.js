
var express = require('express');
var User = require(__dirname + '/../models/user');
var passport = require('passport');
var signinRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();
var app = express();
var path = require('path');

signinRoute.get('/login/facebook',
                passport.authenticate('facebook', {scope: 'email'}));

signinRoute.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/user_splash.html',
    failureRedirect: '/signup'
  })
);

signinRoute.get('/', function(req, res){
  console.log("you got something");
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

signinRoute.get('/index.html', function(req, res){
  console.log("you got something");
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

signinRoute.get('/user_splash.html', ensureAuthenticated, function(req, res){
  res.render('user_splash', { user: req.user });
});

signinRoute.get('/login.html', function(req, res){
  console.log("you got login");
  res.sendFile(path.join(__dirname + '/../public/login.html'));
});

signinRoute.get('/signup.html', function(req, res){
  console.log("you got signup");
  res.sendFile(path.join(__dirname + '/../public/signup.html'));
});

// GET /auth/facebook
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Facebook authentication will involve
//   redirecting the user to facebook.com.  After authorization, Facebook will
//   redirect the user back to this signinRoutelication at /auth/facebook/callback
//this can't be accessed from the browser
signinRoute.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

// GET /auth/facebook/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
signinRoute.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

/* signinRoute.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
}); */

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}