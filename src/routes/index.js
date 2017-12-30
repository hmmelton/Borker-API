var express = require('express');
var middleware = require('../middleware/authMiddleware');
var dogRoutes = require('./dogRoutes');
var authRoutes = require('./authRoutes');

var app = express();

// Add authentication authMiddleware
app.use(middleware.authenticate, middleware.handleAuthError);

app.use('/dog', dogRoutes);
app.use('/auth', authRoutes);

module.exports = app;
