var api_key = process.env.MAILGUN_KEY;
var domain =  process.env.MAILGUN_DOMAIN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

module.exports = exports = {newAccount: newAccount, newNotification: newNotification, ambitionDue: ambitionDue};

function newAccount (userData){
   var data = {
    from: 'Remindr <accounts@remindr.org>',
    to: userData.username,
    subject: 'You just created a Remindr account!',
    text: 'Hey buddy, someone made a new Remindr account with your email. Was it you?' 
  };
  mailgun.messages().send(data, function (error, body) {
    //console.log(body);
  });
}

function newNotification (userData){
   var data = {
    from: 'Remindr <notifications@remindr.org>',
    to: userData.username,
    subject: 'You have a new notification!',
    text: 'Check your Remindr account for a new notification!'
  };
  mailgun.messages().send(data, function (error, body) {
    //console.log(body);
  });
}

function ambitionDue (userData, ambition) {
   var data = {
    from: 'Remindr <notifications@remindr.org>',
    to: userData.username,
    subject: 'You have a new notification!',
    text: "don't forget to " + ambition + "!"
  };
  mailgun.messages().send(data, function (error, body) {
    //console.log(body);
  });
}
