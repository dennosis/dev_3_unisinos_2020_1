const Model = require('./app/models/model');
const Brand = require('./app/models/brand');
const AsyncUtils = require('./utils-module').Async;

const { Seeder } = require('mongo-seeding');
const path = require('path');

const config = {
  database: {
    host: '127.0.0.1',
    port: 27017,
    name: 'cars',
  },
  dropDatabase: true,
};

const seeder = new Seeder(config);

const collections = seeder.readCollectionsFromPath(path.resolve("./data"));

seeder
  .import(collections)
  .then(() => {
    console.log("seed ok")
  })
  .catch(err => {
    console.log("seed erro: ", err);
  });