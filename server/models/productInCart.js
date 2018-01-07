const mongoose = require('mongoose');

const { Schema } = mongoose;

const productInCartSchema = Schema({
  name: String,
  quantity: Number,
});

const ProductInCart = mongoose.model('ProductInCart', productInCartSchema);

module.exports = ProductInCart;
