const express = require('express');
const router = new express.Router;
const Car = require('./controllers/car/car');
const Brand = require('./controllers/brand/brand');
const Model = require('./controllers/model/model');

// Car routes
router.post('/car/create', Car.car_create);
router.get('/car/:id', Car.car_details);
router.put('/car/:id/update', Car.car_update);
router.delete('/car/:id/delete', Car.car_delete);

// Brand routes
router.post('/brand', Brand.create);
router.get('/brand', Brand.find);
router.post('/brand/find/models/:id', Brand.modelsByBrand);

// Model routes
router.post('/brand/:id/model', Model.create);
router.get('/model/:id/brand', Model.brandByModel);

module.exports = router;