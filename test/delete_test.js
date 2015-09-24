// var chai = require('chai');
// var expect = chai.expect;
// var chaiHttp = require('chai-http');
// var mongoose = require('mongoose');
// chai.use(chaiHttp);
// process.env.MONGO_URL = 'mongodb://localhost/db';
// var port = process.env.PORT || 3000; //set to 3000 for now.
// var User = require(__dirname + '/../models/user');

// require(__dirname + "/../server.js");

// describe('CRUD: Delete', function() {
//       // Initiate some data to test removing
//       before(function(done) {
//         existUser = new User();
//         existUser.username = 'existtest';
//         existUser.basic.username = 'existtest';
//         existUser.LDR = [{
//                           relType: 'freind',
//                           conFreq: 'weekly'
//                         }];
//         existUser.ambitions = [{
//                                 ambition: 'learn guitar',
//                                 dueDate: 'dueDate'
//                               }];
//         existUser.pInfo = [{
//                             fullName: 'Pert Mert',
//                             email: 'b.mert@pert.com',
//                             phone: '3603603600',
//                             location: 'Seattle, WA',
//                             timezone: 'PST (UTC−08:00)',
//                             currentLogin: 'the token?'
//                           }];
//         existUser.generateHash('foobar123', function(err, res) {
//           existUser.save(function(err, data) {
//             if (err) throw err;
//             existUser.generateToken(function(err, token) {
//               if (err) throw err;
//               this.token = token;
//               done();
//             }.bind(this));
//           }.bind(this));
//         }.bind(this));  
//       });

//       it('should remove user from database', function(done) {
//         var token = this.token;
//         chai.request('localhost' + port)
//           .post('/api/remove-user')
//           .set('token', token)
//           .end(function(req, res) {
//             User.find({username: 'existtest'}, function(err, docs) {
//               debugger;
//               console.log(docs);
//               expect().to.eql([]);
//               done();
//             });
//           });
//       });
//     });