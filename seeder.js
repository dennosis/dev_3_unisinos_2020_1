const { Seeder } = require('mongo-seeding');
const path = require('path');
require('dotenv').config()

const config = {
  database: process.env.MONGO_URL,
  //dropDatabase: true,
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