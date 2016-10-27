import mongoose from 'mongoose';

const url = 'mongodb://ds031257.mlab.com:31257/healfies';

const options = {
  db: { native_parser: true },
  server: { poolSize: 5 },
  user: 'admin',
  pass: 'admin'
}

export function getConnection() {
  mongoose.connect(url, options);
  return mongoose.connection;
}
