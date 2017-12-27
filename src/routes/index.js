var express = require('express');
var middleware = require('../middleware/authMiddleware');

var app = express();

// Add authentication authMiddleware
app.use(middleware.authenticate, middleware.handleAuthError);

app.route('/test').get(function(req, res) {
  res.send({ message: 'Reached route!' });
});

module.exports = app;
