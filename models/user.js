var mongoose = require('mongoose');
var passport = require('passport');
// var something = require('something');
// var somethingElse = require('somethingElse');

var userSchema = new mongoose.Schema({
    username: String,
    basic: {
        username: String,
        password: String,
        admin: Boolean
    },
    // we'll want to set the default for reminder to false
    reminder: {
        ambition: Boolean,
        student: Boolean,
        business: Boolean,
        personal: Boolean
    }
});

userSchema.methods.generateHash = function(password, callback){
  // add method to generate hash
};

userSchema.methods.comparePword = function(password, callback){
  // logic to compare password auth
};

userSchema.methods.generateToken = function(password, callback){
 // logic to generate tokens
};

module.exports = mongoose.model('User', userSchema);
