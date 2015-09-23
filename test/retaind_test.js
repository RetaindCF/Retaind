var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/db';
var port = process.env.PORT || 3000; //set to 3000 for now.
var User = require(__dirname + '/../models/user');

require(__dirname + "/../server.js");

describe('Retaind Routes', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });
  describe('database insertion', function() {
    var personalUser;
    // set up a user to be used in insertion tests
    before(function(done) {
      personalUser = new User();
      personalUser.username = 'ptest';
      personalUser.basic.username = 'ptest';
      personalUser.generateHash('foobar123', function(err, res) {
        personalUser.save(function(err, data) {
          if (err) throw err;
          personalUser.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

      
    it('should be able to store personal info in the database given a '
       + 'json object', function(done) {
      
      var token = this.token;
      var personalJson = {pInfo: {
        fullName: 'Bert Mert',
        email: 'b.mert@pert.com',
        phone: '3603603600',
        location: 'Seattle, WA',
        timezone: 'PST (UTC−08:00)',
        currentLogin: 'the token?'
      }};
      
      chai.request("localhost:" + port)
        .post('/api/personal')
        .set('token', token)
        .send(personalJson)
        .end(function(req, res) {
          
          User.findOne({username: 'ptest'}, function(err, user) {
            expect(user.pInfo[0].fullName).to.eql('Bert Mert');
            expect(user.pInfo[0].email).to.eql('b.mert@pert.com');
            expect(user.pInfo[0].phone).to.eql('3603603600');
            expect(user.pInfo[0].location).to.eql('Seattle, WA');
            expect(user.pInfo[0].timezone).to.eql('PST (UTC−08:00)');
            expect(user.pInfo[0].currentLogin).to.eql('the token?');
            done();
          });
        });
    });
  });
});