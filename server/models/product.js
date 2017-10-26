const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
});

const Product = mongoose.model('Comment', productSchema);

module.exports = Product;
