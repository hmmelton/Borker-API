var jwt = require('jsonwebtoken');
var express = require('express');
var https = require('https');
var config = require('../config');
var User = require('../models/user');
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

var upsertUser = function(req, res) {
  // Find user by Facebook ID
  User.findOne({ facebookId: req.body.facebookId }, function(err, user) {
    if (!user) {
      // If there is an error...
      let newUser = User(req.body);

      // ...try to save a new user
      newUser.save(function(error, savedUser) {
        if (error) {
          // Return any error
          res.json(error);
        } else {
          // Return access tokens to client
          res.status(201).set({
            'Access-Token': createToken(savedUser['_id'], ONE_DAY),
            'Refresh-Token': createToken(savedUser['_id'], SIX_MONTHS),
          }).json(user);
        }
      });
    } else if (!err) {
      // If there is no error, send access tokens back to client
      res.status(200).set({
        'Access-Token': createToken(savedUser['_id'], ONE_DAY),
        'Refresh-Token': createToken(savedUser['_id'], SIX_MONTHS),
      }).json(user);
    }
  });
};

// Validate a Facebook auth token
app.post('/login/:token', function(req, res, next) {
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
      if (fbRes.statusCode == 200) {
        next();
      } else {
        // There was an error -> send it back to the user
        res.sendStatus(fbRes.statusCode);
      }
    });

    fbRes.on('error', error => {
      console.log(error);
      res.sendStatus(fbRes.statusCode);
    });
  }).end();
}, upsertUser);

module.exports = app;
