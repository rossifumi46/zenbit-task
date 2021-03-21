const mongoose = require('mongoose');
const validator = require('validator');

const adSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  olxId: {
    type: Number,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  city: {
    type: String,
    required: true,
  },
  disctrict: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ad', adSchema);
