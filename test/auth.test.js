const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

const { createUser, login } = require('./utils/util');

describe('Signup', () => {
  it('should error - password mistmatch', async () => {
    const res = await createUser('test1', 'test1', 'notTest1');

    expect(res.status).to.eq(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.eq('passwords do not match');
  });

  it('should sign up w/ hidden passwordHash', async () => {
    const res = await createUser('test1', 'test1', 'test1');

    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('username');
    expect(res.body).to.not.have.property('passwordHash');
  });

  it('should not sign up - duplicate user', async () => {
    const res = await createUser('test1', 'test1', 'test1');

    expect(res.status).to.eq(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.eq('user already exists');
  });
});


describe('Login', () => {
  it('should login', async () => {
    const res = await login('test1', 'test1');

    expect(res.status).to.eq(200);
  });

});