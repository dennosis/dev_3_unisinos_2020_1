const express = require('express');
const router = new express.Router;

const App = require('./controllers/app/app');
const Car = require('./controllers/car/car');
const Brand = require('./controllers/brand/brand');
const Location = require('./controllers/location/location');
const Model = require('./controllers/model/model');
const User = require('./controllers/user/user');

// App routes
router.post('/app', App.create);
router.get('/apps', App.find);

// Test
router.get('/', App.test);

// Car routes
router.post('/car', Car.create);
router.get('/cars', Car.find);
router.post('/cars/search', Car.search);
router.get('/car/:id/apps', Brand.modelsByBrand);

// Brand routes
router.post('/brand', Brand.create);
router.get('/brands', Brand.find);
router.get('/brand/:id/models', Brand.modelsByBrand);

// Location routes
router.post('/location', Location.create);

// Model routes
router.post('/brand/:id/model', Model.create);
router.get('/model/:id/brand', Model.brandByModel);

// User routes
router.post('/user/register', User.create);

module.exports = router;