const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

describe('Signup', () => {
  it('should error - password mistmatch', async () => {
    const res = await chai
    .request(app)
    .post('/auth/sign-up')
    .send({
      'username': 'test',
      'password': 'test',
      'passwordConfirm': 'notTest'
    });

    expect(res.status).to.eq(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.eq('passwords do not match');
  });

  it('should sign up w/ hidden passwordHash', async () => {
    const res = await chai
    .request(app)
    .post('/auth/sign-up')
    .send({
      'username': 'test',
      'password': 'test',
      'passwordConfirm': 'test'
    });

    expect(res.status).to.eq(200);
    expect(res.body).to.have.property('username');
    expect(res.body).to.not.have.property('passwordHash');
  });

  it('should not sign up - duplicate user', async () => {
    const res = await chai
    .request(app)
    .post('/auth/sign-up')
    .send({
      'username': 'test',
      'password': 'test',
      'passwordConfirm': 'test'
    });

    expect(res.status).to.eq(400);
    expect(res.body).to.have.property('error');
    expect(res.body.error).to.eq('user already exists');
  });
});


describe('Login', () => {
  it('should login', async () => {
    const res = await chai
    .request(app)
    .post('/auth/login')
    .send({
      'username': 'test',
      'password': 'test',
    });

    expect(res.status).to.eq(200);
  });

});