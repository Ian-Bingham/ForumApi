const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

const { createUser, getUserById } = require('./utils/util');

describe('Get User', () => {
  it('should get single user', async () => {
    const createRes = await createUser('test2', 'test2', 'test2');

    const getRes = await getUserById(createRes.body._id);

    expect(getRes.status).to.eq(200);
    expect(getRes.body.username).to.eq('test2');
    expect(getRes.body).to.not.have.property('passwordHash');
  });
});