var express = require('express');
var Dog = require('../models/dog');
var app = express();

var removeElements = function(req, res) {
  if (req.dog) {
    var dog = req.dog;

    delete dog['__v'];

    res.status(200).json(dog);
  } else if (req.dogs) {
    var dogs = req.dogs;

    for (var i  = 0; i < dogs.length; i++) {
      delete dogs[i]['__v'];
    }

    res.status(200).json(dogs);
  }
};

// Add a dog
app.post('/', function(req, res, next) {
  var newDog = new Dog(req.body);
  newDog.save(function(err, dog) {
    if (err) {
      // Send error back to client
      res.status(400).send(err);
    } else {
      // Send newly created dog back to client
      req.dog = dog;
      next();
    }
  });
}, removeElements);

// Get a dog by ID
app.get('/:id', function(req, res, next) {
  Dog.findById(req.params.id, function(err, dog) {
    if (err) {
			// If there was an error, send it back to the client
			res.status(500).send(err);
		} else if (dog === null) {
			// If dog is null, send back error to client
			res.status(404).json({ error: 'Dog not found' });
		} else {
			// Dog was found - return to client
			req.dog = dog;
      next()
		}
  });
}, removeElements);

// Get dogs by shelter ID
app.get('/shelter/:id', function(req, res, next) {
  Dog.findByShelterId(req.params.id, function(err, dogs) {
    if (err) {
      // Send error back to client
      res.status(400).send(err);
    } else if (dogs === null) {
      // Dogs were not found
      res.status(404).send({ error: 'Dogs not found' });
    } else {
      // Dogs were found
      req.dogs = dogs;
      next();
    }
  });
}, removeElements);

// Get dogs by filters
app.post('/filter', function(req, res, next) {
  var filters = req.body || {};
  Dog.findWithFilters(filters, function(err, dogs) {
    if (err) {
      // Send error back to client
      res.status(400).send(err);
    } else if (dogs === null) {
      // Dogs were not found
      res.status(404).send({ error: 'Dogs not found' });
    } else {
      // Dogs were found
      req.dogs = dogs;
      next();
    }
  });
}, removeElements);

module.exports = app;
