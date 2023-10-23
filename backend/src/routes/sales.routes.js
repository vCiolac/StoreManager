const express = require('express');
const { salesController } = require('../controllers');
const {
  validateCreateSales,
  validadeBodyCreateSales,
  validadeUpdateQuantity,
  validadeParams,
} = require('../middlewares');

const router = express.Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.getSaleById);

router.post('/', validadeBodyCreateSales, validateCreateSales, salesController.createSales);

router.delete('/:id', salesController.deleteSaleById);

router.put(
  '/:id/products/:productId/quantity',
  validadeUpdateQuantity,
  validadeParams,
  salesController.updateSaleQuantity,
);

module.exports = router;