var chai = require('chai');
var chaiHttp = require('chai-http');
var mongoose = require('mongoose');
var expect = chai.expect;
var port = process.env.PORT || 3000; //set to 3000 for now.
process.env.MONGO_URL = 'mongodb://localhost/db';
chai.use(chaiHttp);

require(__dirname + "/../server");
var User = require(__dirname + '/../models/user');
var eatauth = require(__dirname + "/../lib/eat_auth");
var httpBasic = require(__dirname + '/../lib/http_basic');

describe('httpbasic', function() {
  it('should be able to parse http basic auth', function() {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('test:foobar123')).toString('base64')
      }
    };

    httpBasic(req, {}, function() {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.username).to.eql('test');
      expect(req.auth.password).to.eql('foobar123');
    });
  });
});

describe('auth', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      done();
    });
  });

  it('should be able to create a user', function(done) {
    chai.request('localhost:' + port)
      .post('/api/login')
      .send({username: 'testuser', password: 'foobar123'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  describe('user already in database', function() {
    before(function(done) {
      var user = new User();
      user.username = 'test';
      user.basic.username = 'test';
      user.generateHash('foobar123', function(err, res) {
        user.save(function(err, data) {
          if (err) throw err;
          user.generateToken(function(err, token) {
            if (err) throw err;
            this.token = token;
            done();
          }.bind(this));
        }.bind(this));
      }.bind(this));
    });

    it('should be able to sign in', function(done) {
      chai.request('localhost:' + port)
        .get('/api/signin')
        .auth('test', 'foobar123')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it('should be able to authenticat with eat auth', function(done) {
      var token = this.token;
      var req = {
        headers: {
          token: token
        }
      };

      eatauth(req, {}, function() {
        expect(req.user.username).to.eql('test');
        done();
      });
    });
  });
});