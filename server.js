
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook');
app.use(passport.initialize());
app.use(passport.session());
var jsonParser = require('body-parser').json();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/db');
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
    process.nextTick(function() {
      User.findOne({'fb.id': profile.id}, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        }

        var newUser = new User();

        newUser.fb.id = profile.id;
        newUser.fb.accessToken = accessToken;
        newUser.fb.firstName = profile.name.givenName;
        newUser.fb.lastName = profile.name.familyName;
        newUser.fb.email = profile.emails[0].value;

        newUser.save(function(err) {
          if (err) return err;

          return done(null, newUser);
        });
      });      
    });
  }));
app.listen(port, function() {
  console.log('server up on port: ' + port);
});
