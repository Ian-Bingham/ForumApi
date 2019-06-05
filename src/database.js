const mongoose = require('mongoose');

const getDatabaseString = () => {
  if(process.env.ENV == 'test'){
    return 'mongodb://localhost:27017/forum-test';
  }
  else{
    return 'mongodb://localhost:27017/forum';
  }
};

const connectDatabase = () => {
  mongoose.connect(getDatabaseString(), {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  console.log('Connected to database...');

  mongoose.connection.on('error', (err) => {
    console.error(err);
    process.exit(-1);
  });
};

module.exports = {
  connectDatabase,
};