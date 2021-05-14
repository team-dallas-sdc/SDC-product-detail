const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  product_id: {
    type: Number,
    required: true
  },
  style_id: {
    type: Number,
    required: true
  }
  ,
  name: {
    type: String,
    required: true
  },
  sale_price: {
    type: String
  },
  original_price: {
    type: String
  },
  default?: {
    type: Number,
  },
  // skus: {
  //   type: Object,
  // }
  // photos: {
  //   type: Array,
  // }
});

module.exports = Item = mongoose.model('item', ItemSchema);