const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;
const mongoose = require('mongoose');

const { createUser, login, getUserById, getUserProfile, getAllUsers } = require('./utils/util');

describe('User Controller Tests', () => {
  it('should not GetUserById: user dne', async () => {
    const getUserByIdRes = await getUserById(mongoose.Types.ObjectId());

    expect(getUserByIdRes.status).to.eq(404);
  });

  it('should GetUserById: no posts/boards props', async () => {
    const createUserRes = await createUser('getUser1', 'getUser1', 'getUser1');

    const getUserByIdRes = await getUserById(createUserRes.body._id);

    expect(getUserByIdRes.status).to.eq(200);
    expect(getUserByIdRes.body.username).to.eq('getUser1');
    expect(getUserByIdRes.body).to.not.have.property('posts');
    expect(getUserByIdRes.body).to.not.have.property('boards');
    expect(getUserByIdRes.body).to.not.have.property('passwordHash');
  });

  it('should GetUserProfile: has posts/boards props', async () => {
    const loginRes = await login('getUser1', 'getUser1');
    
    const getUserProfileRes = await getUserProfile(loginRes.body.token);

    expect(getUserProfileRes.status).to.eq(200);
    expect(getUserProfileRes.body.username).to.eq('getUser1');
    expect(getUserProfileRes.body).to.have.property('posts');
    expect(getUserProfileRes.body).to.have.property('boards');
    expect(getUserProfileRes.body).to.not.have.property('passwordHash');
  });

  it('should GetAllUsers: has list of users', async () => {
    const createUserRes = await createUser('getUser2', 'getUser2', 'getUser2');
    
    const getAllUsersRes = await getAllUsers();

    expect(getAllUsersRes.status).to.eq(200);
    expect(getAllUsersRes.body).to.be.an('array');
    expect(getAllUsersRes.body.length).to.eq(2);
    expect(getAllUsersRes.body[0].username).to.eq('getUser1');
    expect(getAllUsersRes.body[1].username).to.eq('getUser2');
  });
});