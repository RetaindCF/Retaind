var mongoose = require('mongoose');
var eat = require('eat');
var bcrypt = require('bcrypt');

var pInfoSchema = new mongoose.Schema({
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

var LDRSchema = new mongoose.Schema({
    relType: String,
    conFreq: String
});

var userSchema = new mongoose.Schema({
   username: {type: String, unique: true},
    basic: {
    username: {type: String, unique: true},
    password: String
    },
    pInfo: [pInfoSchema],
    ambitions: [ambitionsSchema],
    LDR: [LDRSchema]
    //calendar:

});

//userSchema.ambitions.push({ambition: "Go to the moon", dueDate: "tomorrow"});

userSchema.methods.generateHash = function(password, callback) {
  // creates a hash of the password, salts it eight times. You don't
  // want to salt less than 6-8 times. More salting means harder to crack,
  // but slower to run.
  bcrypt.hash(password, 8, function(err, hash) {
    if (err) return callback(err);
    this.basic.password = hash;
    callback(null, hash);
  }.bind(this));
};

userSchema.methods.compareHash = function(password, callback) {
  // compaires the hashed password in the database against the
  // hashed password from the req header
  bcrypt.compare(password, this.basic.password, callback);
};

userSchema.methods.generateToken = function(callback) {
  // make a token that we know was made on our machine, because it uses
  // the machine specific APP_SECRET enviromental veriable that we set
  // from console.
  eat.encode({id: this._id}, process.env.APP_SECRET, callback);
};

module.exports = mongoose.model('User', userSchema);
