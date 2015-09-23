var User = require(__dirname + "/../models/user");

module.exports = function(req, res, schemaName) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: {schemaName: req.body[schemaName]}},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
};