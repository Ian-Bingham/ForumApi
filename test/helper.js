const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

// Tell chai to use the chai-http plugin
chai.use(chaiHttp);

process.env.ENV = 'test';
setTimeout(() => {
  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});