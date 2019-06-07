const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

const { createUser, login } = require('./utils/util');

describe('Auth Controller Tests', () => {
  it('should not Signup: password mistmatch', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'notAuthUser1');

    expect(createUserRes.status).to.eq(400);
    expect(createUserRes.body).to.have.property('error');
    expect(createUserRes.body.error).to.eq('passwords do not match');
  });

  it('should Signup: hidden passwordHash', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'authUser1');

    expect(createUserRes.status).to.eq(200);
    expect(createUserRes.body).to.have.property('username');
    expect(createUserRes.body).to.not.have.property('passwordHash');
  });

  it('should not Signup: duplicate user', async () => {
    const createUserRes = await createUser('authUser1', 'authUser1', 'authUser1');

    expect(createUserRes.status).to.eq(400);
    expect(createUserRes.body).to.have.property('error');
    expect(createUserRes.body.error).to.eq('user already exists');
  });

  it('should Login', async () => {
    const loginRes = await login('authUser1', 'authUser1');

    expect(loginRes.status).to.eq(200);
  });

});