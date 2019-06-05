const passport = require('passport');
const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const Board = require('../models/Board');
const Post = require('../models/Post');

const router = Router();

const jwtAuth = passport.authenticate('jwt', { session: false });

const createValidators = [
  jwtAuth,
  check(['name']).exists(),
];

// List Board(s)
router.get('/', async (req, res) => {
  const boards = await Board.find();

  res.send(boards);
});

// Create Board
router.post('/', createValidators, async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const board = new Board({
    ...req.body,
    user: req.user._id,
  });

  try {
    await board.save();
    res.send(board);
  } catch(err) {
    res.sendStatus(500);
  }

});

// Read Board
router.get('/:_id', async (req, res) => {
  const { _id } = req.params;

  const board = await Board.findOne({ _id }).populate('posts');

  if(board) {
    res.send(board);
  } else {
    res.sendStatus(404);
  }

});

// Update Board
router.patch('/:_id', jwtAuth, async (req, res) => {
  const { _id } = req.params;

  const board = await Board.findOne({ _id });

  if(!board) {
    return res.sendStatus(404);
  }

  try {
    if(board.user.equals(req.user._id)) {
      board.set(req.body);
      board.save();
      return res.sendStatus(200);
    }
  } catch(err) {
    return res.sendStatus(400).send({ errors: err.array() });
  }

  res.sendStatus(401);

});

// Delete Board
router.delete('/:_id', jwtAuth, async (req, res) => {
  const { _id } = req.params;

  const board = await Board.findOne({ _id });

  if(!board) {
    return res.sendStatus(404);
  }

  try {
    if(board.user.equals(req.user._id)) {
      const posts = await Post.find({ board: board._id });
      posts.forEach(async (post) => {
        await post.delete();
      });

      await board.delete();
      return res.sendStatus(200);
    }
  } catch(err) {
    return res.sendStatus(400).send({ errors: err.array() });
  }

  res.sendStatus(401);

});

module.exports = router;