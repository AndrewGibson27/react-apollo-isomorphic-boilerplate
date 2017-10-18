const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = Schema({
  body: String,
  story_id: Schema.Types.ObjectId,
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
