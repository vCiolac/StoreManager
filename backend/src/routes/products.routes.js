const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.findAllProducts);
router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProductById);

router.delete('/:id', productsController.deleteProductById);

module.exports = router;