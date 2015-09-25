var User = require(__dirname + '/../models/user');
var mongoose = require('mongoose');
var mailgun = require(__dirname + '/../lib/mailgun');


module.exports = function() {
  console.log('dateCheck start');
  var now = new Date().getTime();
  User.find({}, function(err, docs) {
    if (err) console.log(err);
    for(var i = 0; i < docs.length; i++) {
      for(var j = 0; j < docs[i].ambitions.length; j++) {
        if(docs[i].ambitions[j].dueDate.getTime() < now){
          // sends email to user. takes user data and ambition
          mailgun.ambitionDue(docs[i], docs[i].ambitions[j].ambition);
        }
      }
    }
  });
};