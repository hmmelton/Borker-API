var express = require('express');
var middleware = require('../middleware/authMiddleware');
var dogRoutes = require('../controllers/dogController');
var authRoutes = require('../controllers/authController');

var app = express();

// Add authentication authMiddleware
app.use(middleware.authenticate, middleware.handleAuthError);

app.use('/dog', dogRoutes);
app.use('/auth', authRoutes);

module.exports = app;
