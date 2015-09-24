var eat = require('eat');
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/handle_error');
var EventEmitter = require('events');
var ee = new EventEmitter();

module.exports = exports = function(req, res, next) {
  var encryptedToken = req.headers.token || (req.body ? req.body.token : undefined);
  if (!encryptedToken) {

    return res.status(401).json({msg: 'could not authenticate.'});
  }
  ee.emit('decode', req, res, encryptedToken, next);
};

ee.on('decode', function(req, res, encryptedToken, next) {
  eat.decode(encryptedToken, process.env.APP_SECRET, function(err, token) {
    if (err) return handleError(err, res);
    ee.emit('matchUser', req, res, token, next);
  });
});

ee.on('matchUser', function(req, res, token, next) {
  User.findOne({_id: token.id}, function(err, user) {
    if (err) return handleError(err, res);
    if (!user) return res.status(401).json({msg: 'could not authenticate.'});
    req.user = user;
    next();
  });
});