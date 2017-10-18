const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
  body: String,
  category: String,
  headline: String,
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
