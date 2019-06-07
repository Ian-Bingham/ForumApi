const chai = require('chai');

const app = require('../../src/server.js');

// Auth
const createUser = async (username, password, passwordConfirm) => {
  const res = await chai
    .request(app)
    .post('/auth/sign-up')
    .send({
      'username': username,
      'password': password,
      'passwordConfirm': passwordConfirm
    });

    return res;
};

const login = async (username, password) => {
  const res = await chai
    .request(app)
    .post('/auth/login')
    .send({
      'username': username,
      'password': password,
    });

    return res;
};

// User
const getUserById = async (id) => {
  const res = await chai
    .request(app)
    .get(`/user/${id}`);

    return res;
};

const getUserProfile = async (token) => {
  const res = await chai
    .request(app)
    .get('/user/profile')
    .set('Authorization', `Bearer ${token}`);

    return res;
};

const getAllUsers = async () => {
  const res = await chai
    .request(app)
    .get('/user');

    return res;
};

// Board
const createBoard = async (name, token) => {
  const res = await chai
    .request(app)
    .post('/board')
    .set('Authorization', `Bearer ${token}`)
    .send({ name });

    return res;
};

const getBoardById = async (id) => {
  const res = await chai
    .request(app)
    .get(`/board/${id}`);

    return res;
};

const patchBoardById = async (id, token, name) => {
  const res = await chai
    .request(app)
    .patch(`/board/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ name });

    return res;
};

const deleteBoardById = async (id, token) => {
  const res = await chai
    .request(app)
    .delete(`/board/${id}`)
    .set('Authorization', `Bearer ${token}`);

    return res;
};

module.exports = { 
  createUser, login, 
  getUserById, getUserProfile, getAllUsers, 
  createBoard, getBoardById, patchBoardById, deleteBoardById };