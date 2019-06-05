const chai = require('chai');
const app = require('../src/server.js');
const expect = chai.expect;

const signupNewUser = async () => {
  const res = await chai
    .request(app)
    .post('/auth/sign-up')
    .send({
      'username': 'newUser',
      'password': 'newUser',
      'passwordConfirm': 'newUser'
    });

    return res.body;
};

describe('Get User', () => {
  it('should get single user', async () => {
    const user = await signupNewUser();

    const res = await chai
    .request(app)
    .get(`/user/${user._id}`);

    expect(res.status).to.eq(200);
    expect(res.body.username).to.eq('newUser');
    expect(res.body).to.not.have.property('passwordHash');
  });
});