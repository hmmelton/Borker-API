var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dogSchema = new Schema({
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
    type: Number,
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
    ref: 'Shelter',
    required: true
  },
  createdWhen: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Static methods for querying model
dogSchema.statics.findByShelterId = function(shelterId, callback) {
  return this.find({ shelterId: shelterId }, callback).lean();
};

dogSchema.statics.findWithFilters = function(filters, callback) {
  return this.find(filters, callback).lean();
};

module.exports = mongoose.model('Dog', dogSchema);
