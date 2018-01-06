var jwt = require('jsonwebtoken');
var express = require('express');
var https = require('https');
var config = require('../config');
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
app.get('/tokens/:id', function(req, res) {
  let token = createToken(req.params.id, ONE_DAY);
  let refreshToken = createToken(req.params.id, SIX_MONTHS);

  res.status(200).send({ token: token, refreshToken: refreshToken });
});

// Validate a Facebook auth token
app.get('/validate_token/:token', function(req, res) {
  var options = {
    method: 'GET',
    host: 'graph.facebook.com',
    path: '/debug_token?input_token=' + req.params.token + '&access_token=' + config.fbAppToken
  };
  https.request(options, function(fbRes) {
    var chunks = [];

    fbRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    fbRes.on("end", function () {
      var body = Buffer.concat(chunks);
      res.sendStatus(fbRes.statusCode);
    });

    fbRes.on('error', error => {
      console.log(error);
      res.sendStatus(fbRes.statusCode);
    });
  }).end();
});

module.exports = app;
