
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var passportFacebook = require(__dirname + "/lib/passport_facebook");
app.use(passport.initialize());
app.use(passport.session());
var jsonParser = require('body-parser').json();


mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var port = process.env.PORT || 3000; //set to 3000 for now.

//TODO: make signin-routes a real boy
var signInRouter = require(__dirname + '/routes/signin_routes');
app.use(signInRouter); //universal for now

// Needed to support auth sessions with Facebook
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(passportFacebook);

app.listen(port, function() {
  console.log('server up on port: ' + port);
});
