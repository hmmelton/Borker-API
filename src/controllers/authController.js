var jwt = require('jsonwebtoken');
var express = require('express');
const SECRET = require('../config').jwtSecret;

var app = express();

// Token expiration constants
const SIX_MONTHS = 60 * 60 * 24 * 30 * 6;
const ONE_DAY = 60 * 60 * 24;

var createToken = function(id, duration) {
  return jwt.sign({
    id: id
  }, SECRET,
  {
    expiresIn: duration
  });
};

// Get an access token and refresh token
app.get('/tokens/:id', function (req, res) {
  let token = createToken(req.params.id, ONE_DAY);
  let refreshToken = createToken(req.params.id, SIX_MONTHS);

  res.status(200).send({ token: token, refreshToken: refreshToken });
});

module.exports = app;
