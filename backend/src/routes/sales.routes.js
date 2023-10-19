const express = require('express');
const { salesController } = require('../controllers');
const { validateCreateSales, checkSalesArray } = require('../middlewares');

const router = express.Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.getSaleById);

router.post('/', validateCreateSales, salesController.createSales);

module.exports = router;