var User = require(__dirname + "/../models/user");
var handleError = require(__dirname + "/handle_error");

module.exports = function(req, res, push) {
  User.findOneAndUpdate({ username: req.user.username },
  { $push: push},
  function(err, doc) {
    if (err) handleError(err);
  });
  return res.end();
};