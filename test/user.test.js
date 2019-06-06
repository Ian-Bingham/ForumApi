const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;
const mongoose = require('mongoose');

const { createUser, login, getUserById, getUserProfile, getAllUsers } = require('./utils/util');

describe('Get User', () => {
  it('should error - user dne', async () => {
    const getUserRes = await getUserById(mongoose.Types.ObjectId());

    expect(getUserRes.status).to.eq(404);
  });

  it('should get user by id - no posts/boards props', async () => {
    const createUserRes = await createUser('getUser1', 'getUser1', 'getUser1');

    const getUserRes = await getUserById(createUserRes.body._id);

    expect(getUserRes.status).to.eq(200);
    expect(getUserRes.body.username).to.eq('getUser1');
    expect(getUserRes.body).to.not.have.property('posts');
    expect(getUserRes.body).to.not.have.property('boards');
    expect(getUserRes.body).to.not.have.property('passwordHash');
  });

  it('should get user profile - has posts/boards props', async () => {
    const loginRes = await login('getUser1', 'getUser1');
    
    const getUserRes = await getUserProfile(loginRes.body.token);

    expect(getUserRes.status).to.eq(200);
    expect(getUserRes.body.username).to.eq('getUser1');
    expect(getUserRes.body).to.have.property('posts');
    expect(getUserRes.body).to.have.property('boards');
    expect(getUserRes.body).to.not.have.property('passwordHash');
  });

  it('should get all users', async () => {
    const createUserRes = await createUser('getUser2', 'getUser2', 'getUser2');
    
    const getUsersRes = await getAllUsers();

    expect(getUsersRes.status).to.eq(200);
    expect(getUsersRes.body).to.be.an('array');
    expect(getUsersRes.body.length).to.eq(2);
    expect(getUsersRes.body[0].username).to.eq('getUser1');
    expect(getUsersRes.body[1].username).to.eq('getUser2');
  });
});