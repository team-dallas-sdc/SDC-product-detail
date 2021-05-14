const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productStylesSchema = new Schema({
  product_id: {
    type: Number,
    required: true
  },
  results: {
    type: ['Mixed'],
  }
});

const productStyles = mongoose.model('ProductStyles', productStylesSchema, 'final_data')

module.exports = productStyles