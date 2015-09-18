
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/');
var port = process.env.PORT || 3000; //no .env, so set to 3000 for now.

/*var signInRouter = require('/routes/signin-routes');

app.use('/signin', signInRouter); */

app.listen(port, function() {
  console.log('server up on port: ' + port);
});
