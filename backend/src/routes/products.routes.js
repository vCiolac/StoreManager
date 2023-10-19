const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

module.exports = router;