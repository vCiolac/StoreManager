const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.getProductById);

module.exports = router;