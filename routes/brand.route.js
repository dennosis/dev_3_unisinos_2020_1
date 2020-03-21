const express = require('express');
const router = express.Router();

const brand_controller = require('../controllers/brand.controller');

router.post('/create', brand_controller.brand_create);
router.get('/:id', brand_controller.brand_details);
router.put('/:id/update', brand_controller.brand_update);
router.delete('/:id/delete', brand_controller.brand_delete);

module.exports = router;