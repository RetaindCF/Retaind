var User = require(__dirname + '/../models/user.js');
var mongoose = require('mongoose');
var mailgun = require(__dirname + '/../mailgun.js');

// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');


module.exports = function() {
  var now = new Date();
  User.find({}, function(err, docs) { 
    if (err) console.log(err);
    for(var i = 0; i < docs.length; i++) {
      for(var j = 0; j < docs[i].ambitions.length; j++) {
        if(docs[i].ambitions[j].dueDate !== now){
          // sends email to user. takes user data and ambition
          mailgun.ambitionDue(docs[i], docs[i].ambitions[j].ambition);
        }
      }
      
    }

  });
};