const chai = require('chai');

const app = require('../../src/server.js');

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
    .get('/user/');

    return res;
};

module.exports = { createUser, login, getUserById, getUserProfile, getAllUsers };