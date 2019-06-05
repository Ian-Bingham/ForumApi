const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/User');

const router = Router();

// Create User
router.post('/sign-up', [
  check(['username', 'password', 'passwordConfirm']).exists(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }

  const { username, password, passwordConfirm } = req.body;

  const userExists = await User.findOne({ username });

  if(userExists) {
    return res.status(400).send({error: 'user already exists'});
  }

  if(password !== passwordConfirm) {
    res.status(400).send({error: 'passwords do not match'});
    return;
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = new User({
    username,
    passwordHash,
  });

  try {
    await user.save();
    res.send(user);
  } catch(error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post('/login', 
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      {
        username: req.user.username,
        _id: req.user._id,
      }, 
      'CHANGEMEPLEASE!',
      {
        expiresIn: '2 days',
      }
    );
    res.send({ token, expiresIn: '2 days' });
  }
);

module.exports = router;