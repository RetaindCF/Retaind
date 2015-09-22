var mongoose = require('mongoose');
// var something = require('something');
// var somethingElse = require('somethingElse');

var basicInfoSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    location: String,
    timezone: String,
    currentLogin: String
});

var ambitionsSchema = new mongoose.Schema({
    ambition: String,
    dueDate: String
});

var LDRSchema = new moongose.Schema({
    relType: String,
    conFreq: String
});
var userSchema = new mongoose.Schema({
    basicInfo: [basicInfoSchema],
    ambitions: [ambitionsSchema],
    LDR: [LDRSchema]
    //calendar:

});

//userSchema.ambitions.push({ambition: "Go to the moon", dueDate: "tomorrow"});

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
