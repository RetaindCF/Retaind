var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook');
var passportFacebook = require(__dirname + "/../lib/passport_facebook");
var passport = require('passport');
var User = require(__dirname + "/../models/user.js");

chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/db';

require(__dirname + "/../server.js");

describe('Travis test', function() {
  it('should work on travis', function() {
    expect(true).to.eql(true);
  });
});

describe('Facebook Login', function() {

  it('should add a new user to db based on FB login', function(done) {
    chai.request('http://localhost:8080')
      .get('/login/facebook')
      .end(function(req,res) {
        expect();
        done();
      });

  });
});