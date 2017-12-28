var express = require('express');
var middleware = require('../middleware/authMiddleware');
var dogRoutes = require('./dogRoutes');

var app = express();

// Add authentication authMiddleware
app.use(middleware.authenticate, middleware.handleAuthError);

app.use('/dog', dogRoutes);

module.exports = app;
