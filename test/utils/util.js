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
  const getRes = await chai
    .request(app)
    .get(`/user/${id}`);

    return getRes;
};

module.exports = { createUser, login, getUserById };