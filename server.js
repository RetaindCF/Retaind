
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var jsonParser = require('body-parser').json();
var dateCheck = require(__dirname + "/lib/date_check");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/db');
var port = process.env.PORT || 3000; //set to 3000 for now.
process.env.APP_SECRET = process.env.APP_SECRET || 'setupanappsecretplease';

//TODO: make signin-routes a real boy
var retaindRouter = require(__dirname + '/routes/retaind_routes');
app.use('/api', retaindRouter);

var usersRouter = require(__dirname + '/routes/users_routes');
app.use('/', express.static(__dirname + '/public'));

app.use('/api', usersRouter);

// Do once a day
setInterval(function() {
  // Checks due date of ambitions and sends an email if they are over due
  dateCheck();
  console.log('daily emails sent');
}, 1000 * 60 * 60 * 24);


app.listen(port, function() {
  console.log('server up on port: ' + port);
});

