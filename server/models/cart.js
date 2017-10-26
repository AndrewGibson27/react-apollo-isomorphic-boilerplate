const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Cart = mongoose.model('Comment', cartSchema);

module.exports = Cart;
