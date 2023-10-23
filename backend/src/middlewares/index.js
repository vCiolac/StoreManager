const validateCreateSales = require('./validateCreateSales');

const validadeBodyCreateSales = require('./validateBodyCreateSales');

const { validadeUpdateQuantity, validadeParams } = require('./validadeUpdateQuantity');

module.exports = {
  validateCreateSales,
  validadeBodyCreateSales,
  validadeUpdateQuantity,
  validadeParams,
};