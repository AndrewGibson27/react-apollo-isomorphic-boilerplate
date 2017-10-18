const mongoose = require('mongoose');

const { dbHost } = require('./config');

function initDb(callback) {
  mongoose.Promise = global.Promise;

  const dPromise = mongoose.connect(dbHost, {
    useMongoClient: true,
  });

  dPromise.then((db) => {
    callback();
  });
}

module.exports = initDb;
