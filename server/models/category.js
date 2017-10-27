const mongoose = require('mongoose');

const { Schema } = mongoose;

const categorySchema = Schema({
  name: String,
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
