var User = require(__dirname + '/../models/user');

//we will hang the values off the req object off a unique key like... userFields
/* req.userFields = {

} */
function userCreate(req, res, next){
  var rFields = req.userFields;
  var rBasic = rFields.basicInfo;
  var newUser = new User();
  var uBasic = newUser.basicInfo;
  basic.fullName = rBasic.fullName;
  basic.currentLogin = new Date().toString();
  newUser.save(function(err){
    if(err) return err;
  })
  next()
}