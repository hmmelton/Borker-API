var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shelterSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address1: {
    type: String,
    required: true
  },
  address2: String,
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  phone: String,
  fax: String,
  email: String,
  createdWhen: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Static methods for querying model
shelterSchema.statics.findById = function(id, callback) {
  return this.find({ id: id }, callback);
};

module.exports = mongoose.model('Shelter', shelterSchema);
