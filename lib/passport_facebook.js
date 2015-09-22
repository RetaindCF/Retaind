var FacebookStrategy = require('passport-facebook').Strategy;
var fbID = process.env.FACEBOOK_APP_ID;
var fbSecret = process.env.FACEBOOK_APP_SECRET;
var User = require(__dirname + '/model/user');

module.exports = exports = new FacebookStrategy({
    clientID: fbID,
    clientSecret: fbSecret,
    callbackURL: '/lib/user_splash.html',
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({fbId: profile.id}, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();

          newUser.fbId = profile.id;
          newUser.fb.id = profile.id;
          newUser.fb.accessToken = accessToken;
          newUser.fb.firstName = profile.name.givenName;
          newUser.fb.lastName = profile.name.familyName;
          newUser.fb.email = profile.emails[0].value;

          newUser.save(function(err) {
            if (err) return err;
            return done(null, newUser);
          });
        }
      });
    });
  });