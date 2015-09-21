var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var User = require(__dirname + "/../models/user.js");
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/db';

require(__dirname + "/../server.js");

describe('Travis test', function() {
  it('should work on travis', function() {
    expect(true).to.eql(true);
  });
});