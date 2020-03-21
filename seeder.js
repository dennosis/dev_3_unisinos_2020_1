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