
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
app.use(passport.initialize());
app.use(passport.session());
var jsonParser = require('body-parser').json();

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/db');
var port = process.env.PORT || 3000; //set to 3000 for now.

var fbID = process.env.FACEBOOK_APP_ID;
var fbSecret = process.env.FACEBOOK_APP_SECRET;

//TODO: make signin-routes a real boy
var signInRouter = require(__dirname + '/routes/signin_routes');
app.use(signInRouter); //universal for now

passport.use(new FacebookStrategy({
    clientID: fbID,
    clientSecret: fbSecret,
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
