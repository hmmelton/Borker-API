var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  facebookId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: String,
  createdWhen: {
    type: Date,
    default: Date.now,
    required: true
  }
});

userSchema.statics.findUser = function(email, facebookId, callback) {
  return this.find({ email: email, facebookId, facebookId }, callback);
}
