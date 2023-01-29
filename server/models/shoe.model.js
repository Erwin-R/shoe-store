const mongoose = require('mongoose');
const ShoeSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [
    //   true,
    //   "{PATH} is required"
    // ],
    // minLength: [
    //   3,
    //   "Name must be at least 3 characters"
    // ]
  },
  size: {
    type: [String],
    // required: [
    //   true,
    //   "{PATH} is required"
    // ]
  },
  price: {
    type: Number,
    // required: [
    //   true,
    //   "{PATH} is required"
    // ],
    default: 0
  },
  description: {
    type: String,
    // required: [
    //   true,
    //   "{PATH} is required"
    // ]
  },
  imgUrls: {
    type: [String],
    // required: [
    //   true,
    //   "{PATH} is required"
    // ]
  },
  brand: {
    type: String,
    // required: [
    //   true,
    //   "{PATH} is required"
    // ]
  },
  categories: {
    type: [String],
    // required: [
    //   true,
    //   "{PATH} is required"
    // ],
    // default: ["No Category"]
  },
  colors: {
    type: [String],
    // required: [
    //   true,
    //   "{PATH} is required"
    // ],
    // default: ["No Category"]
  }
}, {timestamps: true});
module.exports.Shoe = mongoose.model('Shoe', ShoeSchema);