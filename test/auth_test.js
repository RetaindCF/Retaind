var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');

require(__dirname + "/../server.js");

describe('Travis test', function() {
  it('should work on travis', function() {
    expect(true).to.eql(true);
  });
});