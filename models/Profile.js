const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'none'],
    required: true
  },
  nationality: {
    type: String
  },
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      uppercase: true,
      required: true
    },
    zip: {
      type: String,
      required: true
    }
  },
  phone: {
    type: Number
  },

  driver: {
    license: {
      type: String,
      enum: ['yes', 'no']
    },
    car: {
      type: String,
      enum: ['yes', 'no']
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('profile', ProfileSchema);
