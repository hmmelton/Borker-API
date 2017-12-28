var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const SECRET = require('../config').jwtSecret;

// This function verifies an authorization token passed to each request as a
// header.
var authenticate = expressJwt({
  secret: SECRET,
  requestProperty: 'auth'
}).unless({ path: /\/v1\/dog*/ });

// If there was an error with the auth token, send it back to the client.
var handleAuthError = function(err, req, res, next) {
	if(err.name === 'UnauthorizedError') {
		res.status(401).send({ error: err.message });
	 	return;
	}
	next();
};

var createToken = function(auth, duration) {
  return jwt.sign({
    id: auth.id
  }, strings.TOKEN_GEN_SECRET,
  {
    expiresIn: duration
  });
};

var createTokenSet = function (req, res, next) {
  let sixMonths = 60 * 60 * 24 * 30 * 6;
  let oneDay = 60 * 60 * 24;

  req.token = createToken(req.auth, oneDay);
  req.refreshToken = createToken(req.auth, sixMonths);
  next();
};

module.exports = {
  authenticate: authenticate,
  handleAuthError, handleAuthError,
  createTokenSet, createTokenSet
};
