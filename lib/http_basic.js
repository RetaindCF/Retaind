module.exports = exports = function(req, res, next) {
  /* Take the basic authorization from the req header, ot a string that
     will make a parsable string that will result in an empty array if no
     authorization is given. */
  var userPassEncoded = (req.headers.authorization || ' :').split(' ')[1];
  /* Put the user pass in a buffer so it doesn't get parsed by html when
     passed from server to client or vica versa. */
  var userPassBuf = new Buffer(userPassEncoded, 'base64');
  // The encoded password is stored in the token as user:pass
  var userPassSplit = userPassBuf.toString('utf8').split(':');
  req.auth = {
    username: userPassSplit[0],
    password: userPassSplit[1]
  };
  if (!(req.auth.username.length && req.auth.password.length)) {
    console.log('could not authenticate: ' + req.auth.username);
    return res.status(401).send({msg: 'could not authenticat'});
  }

  next();
};
