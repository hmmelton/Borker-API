var expressJwt = require('express-jwt');
const SECRET = require('../config').jwtSecret;

// This function verifies an authorization token passed to each request as a
// header.
var authenticate = expressJwt({
  secret: SECRET,
  requestProperty: 'auth'
}).unless({ path: /\/v1*/ });

// If there was an error with the auth token, send it back to the client.
var handleAuthError = function(err, req, res, next) {
	if(err.name === 'UnauthorizedError') {
		res.status(401).send({ error: err.message });
	 	return;
	}
	next();
};

module.exports = {
  authenticate: authenticate,
  handleAuthError, handleAuthError
};
