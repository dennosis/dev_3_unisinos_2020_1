const express = require('express');
const router = new express.Router;
const App = require('./controllers/app/app');
const Car = require('./controllers/car/car');
const Brand = require('./controllers/brand/brand');
const Model = require('./controllers/model/model');

// App routes
router.post('/app', App.create);
router.get('/apps', App.find);

// Car routes
router.post('/car', Car.create);
router.get('/cars', Car.find);
router.get('/car/:id/apps', Brand.modelsByBrand);

// Brand routes
router.post('/brand', Brand.create);
router.get('/brands', Brand.find);
router.get('/brand/:id/models', Brand.modelsByBrand);

// Model routes
router.post('/brand/:id/model', Model.create);
router.get('/model/:id/brand', Model.brandByModel);

module.exports = router;