const mongoose = require('mongoose');

const statesArray = [
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
];

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    }
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
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
      required: true,
      enum: statesArray
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
