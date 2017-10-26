const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Category = mongoose.model('Comment', categorySchema);

module.exports = Category;
