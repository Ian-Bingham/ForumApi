const passport = require('passport');
const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const Post = require('../models/Post');

const router = Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const createValidators = [
  jwtAuth,
  check(['title', 'body']).exists(),
];

// Create Post
router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const post = new Post({
    ...req.body,
    user: req.user._id,
  });

  try {
    await post.save();
    res.send(post);
  } catch(err) {
    res.sendStatus(500);
  }

});

// Read Post
router.get('/:_id', async (req, res) => {
  const { _id } = req.params;

  const post = await Post.findOne({ _id }).populate('user');

  if(post) {
    res.send(post);
  } else {
    res.sendStatus(404);
  }

});

// Update Post
router.patch('/:_id', jwtAuth, async (req, res) => {
  const { _id } = req.params;

  const post = await Post.findOne({ _id });

  if(!post) {
    return res.sendStatus(404);
  }

  try {
    if(post.user.equals(req.user._id)) {
      post.set(req.body);
      post.save();
      return res.sendStatus(200);
    }
  } catch(err) {
    return res.sendStatus(400).send({ errors: err.array() });
  }

  res.sendStatus(401);

});

// Delete Post
router.delete('/:_id', jwtAuth, async (req, res) => {
  const { _id } = req.params;

  const post = await Post.findOne({ _id });

  if(!post) {
    return res.sendStatus(404);
  }

  try {
    if(post.user.equals(req.user._id)) {
      await post.delete();
      return res.sendStatus(200);
    }
  } catch(err) {
    return res.sendStatus(400).send({ errors: err.array() });
  }

  res.sendStatus(401);

});

module.exports = router;