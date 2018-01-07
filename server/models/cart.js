const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = Schema({
  name: String,
  products: [{
    name: String,
    quantity: Number,
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
