const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/', salesController.findAllSales);
router.get('/:id', salesController.getSaleById);

module.exports = router;