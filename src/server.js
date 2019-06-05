const express = require('express');
const passport = require('passport');

const { connectDatabase } = require('./database');

const AuthController = require('./controllers/auth');
const UserController = require('./controllers/user');
const BoardController = require('./controllers/board');
const PostController = require('./controllers/post');

connectDatabase();

const app = express();
require('./passport');

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', AuthController);
app.use('/user', UserController);
app.use('/board', BoardController);
app.use('/post', PostController);

app.listen(4000, () => {
  console.log('Listening at localhost:4000...');
});

module.exports = app;