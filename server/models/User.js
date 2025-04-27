const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String
  },
  address: {
    type: String
  },
  ice: {
    type: String
  },
  inpe: {
    type: String
  },
  taxId: {
    type: String
  },
  taxPro: {
    type: String
  },
  factureNumber: {
    type: Number,
    default: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);