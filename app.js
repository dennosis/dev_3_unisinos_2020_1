// app.js

const express = require('express');
const bodyParser = require('body-parser');

const carRouter = require('./routes/car.route'); // Imports routes for the car
const brandRouter = require('./routes/brand.route'); // Imports routes for the brand

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://localhost:27017/cars';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/car', carRouter);
app.use('/brand', brandRouter);

let port = 1234;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});