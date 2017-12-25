var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dogSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  shelterId: {
    type: Schema.Types.ObjectId,
    ref: 'Shelter',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  breeds: [String],
  age: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdWhen: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Static methods for querying model
dogSchema.statics.findById = function(id, callback) {
  return this.find({ id: id }, callback);
};

dogSchema.statics.findByShelterId = function(shelterId, callback) {
  return this.find({ shelterId: shelterId }, callback);
};

dogSchema.statics.findWithFilters = function(filters, callback) {
  return this.find(filters, callback);
};

module.exports = mongoose.model('Dog', dogSchema);
