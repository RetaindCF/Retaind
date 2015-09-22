var eatAuth = require(__dirname + "/../lib/eat_auth");
var express = require('express');
var User = require(__dirname + '/../models/user');
var retaindRoute = module.exports = exports = express.Router();
var jsonParser = require('body-parser').json();

retaindRoute.get('/main', function(req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.write({username: req.user.username});
});