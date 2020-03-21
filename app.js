const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/cars', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

// routes
app.use(require('./app/routes'));

const port = 3000;
app.listen(port, () => console.log('server on port', port));