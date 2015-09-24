var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaiHttp);
process.env.MONGO_URL = 'mongodb://localhost/db';
var port = process.env.PORT || 3000; //set to 3000 for now.
var User = require(__dirname + '/../models/user');
var dateCheck = require(__dirname + "/../lib/date_check");
require(__dirname + "/../server.js");

describe('CRUD: read', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  var readUser;
  before(function(done) {
    readUser = new User();
    readUser.username = 'readUser';
    readUser.basic.username = 'readUser';
    readUser.LDR = [{
                      relType: 'freind',
                      conFreq: 'weekly'
                    }];
    readUser.ambitions = [{
                            ambition: 'learn guitar'
                          }];
    readUser.pInfo = [{
                        fullName: 'Kurt Cobain',
                        email: 'b.mert@pert.com',
                        phone: '3603603600',
                        location: 'Seattle, WA',
                        timezone: 'PST (UTC−08:00)',
                        currentLogin: 'the token?'
                      }];
    readUser.generateHash('foobar123', function(err, res) {
      readUser.save(function(err, data) {
        if (err) throw err;
        readUser.generateToken(function(err, token) {
          if (err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it('should read pInfo', function(done) {

    var token = this.token;
    chai.request("localhost:" + port)
        .get('/api/personal')
        .set('token', token)
        .end(function(req, res) {
          
          User.findOne({username: 'readUser'}, function(err, user) {
            expect(user.pInfo[0].fullName).to.eql('Kurt Cobain');
            expect(user.pInfo[0].email).to.eql('b.mert@pert.com');
            expect(user.pInfo[0].phone).to.eql('3603603600');
            expect(user.pInfo[0].location).to.eql('Seattle, WA');
            expect(user.pInfo[0].timezone).to.eql('PST (UTC−08:00)');
            expect(user.pInfo[0].currentLogin).to.eql('the token?');
            done();
          });
        });
  });

  it('should read ambitions', function(done) {
    var token = this.token;
    chai.request("localhost:" + port)
      .get('/api/ambition')
      .set('token', token)
      .end(function(req, res) {
        
        User.findOne({username: 'readUser'}, function(err, user) {
          expect(user.ambitions[0].ambition).to.eql('learn guitar');
          done();
        });
      });
  });

  it('should read LDR', function(done) {
    var token = this.token;
    chai.request("localhost:" + port)
      .get('/api/LDR')
      .set('token', token)
      .end(function(req, res) {
        
        User.findOne({username: 'readUser'}, function(err, user) {
          expect(user.LDR[0].relType).to.eql('freind');
          expect(user.LDR[0].conFreq).to.eql('weekly');
          done();
        });
      });
  });


});