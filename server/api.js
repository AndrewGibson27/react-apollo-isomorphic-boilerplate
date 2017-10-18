const { Router } = require('express');

const Story = require('./models/story');
const Comment = require('./models/comment');

const router = new Router();
const VALID_CATEGORIES = ['featured', 'latest'];

function isValidCategory(category) {
  return VALID_CATEGORIES.includes(category.toLowerCase());
}

router.post('/stories', (req, res, next) => {
  const story = new Story(req.body);

  story.save((err, savedStory) => {
    if (err) {
      return console.error(err);
    }

    res.status(200).json(savedStory);
  });
});

router.get('/stories', (req, res, next) => {
  const { category } = req.query;

  if (category && isValidCategory(category)) {
    Story.find({ category }, (err, stories) => {
      if (err) {
        return console.error(err);
      }

      res.status(200).json(stories);
    });
  } else {
    Story.find((err, stories) => {
      if (err) {
        return console.error(err);
      }

      res.status(200).json(stories);
    });
  }
});

router.get('/stories/:id', (req, res, next) => {
  const { id } = req.params;

  Story.findById(id, (err, story) => {
    if (err) {
      return console.error(err);
    }

    res.status(200).json(story);
  });
});

router.post('/comments', (req, res, next) => {
  const comment = new Comment(req.body);

  comment.save((err, savedComment) => {
    if (err) {
      return console.error(err);
    }

    res.status(200).json(savedComment);
  });
});

router.get('/comments', (req, res, next) => {
  const { story_id } = req.query;

  if (story_id) {
    Comment.find({ story_id }, (err, comments) => {
      if (err) {
        return console.error(err);
      }

      res.status(200).json(comments);
    });
  } else {
    Comment.find((err, comments) => {
      if (err) {
        return console.error(err);
      }

      res.status(200).json(comments);
    });
  }
});

module.exports = router;
