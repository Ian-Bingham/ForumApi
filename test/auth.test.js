const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

const { createUser, login } = require('./utils/util');

describe('Auth Controller Tests', () => {
  // CREATE
  it('should not CreateUser: password mistmatch', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'notAuthUser1');

    expect(createUserRes.status).to.eq(400);
    expect(createUserRes.body).to.have.property('error');
  });

  it('should CreateUser: hidden passwordHash', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'authUser1');

    expect(createUserRes.status).to.eq(200);
    expect(createUserRes.body).to.have.property('username');
    expect(createUserRes.body).to.not.have.property('passwordHash');
  });

  it('should not CreateUser: duplicate user', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'authUser1');

    expect(createUserRes.status).to.eq(400);
    expect(createUserRes.body).to.have.property('error');
  });

  // LOGIN
  it('should Login', async () => {
    const loginRes = await login('authUser1', 'authUser1');

    expect(loginRes.status).to.eq(200);
  });

});