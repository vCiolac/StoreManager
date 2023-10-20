const Joi = require('joi');
const { productsModels } = require('../models');

const schema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().required()
      .min(1)
      .label('productId'),
    quantity: Joi.number().integer().required()
      .min(1)
      .label('quantity'),
  }).messages({
    'any.required': '{{#label}} is required',
    'number.base': '{{#label}} must be a number',
    'number.min': '{{#label}} must be greater than or equal to 1',
  }),
);

const validateCreateSales = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const changeStatusCode = error.details.find((detail) => detail.type === 'any.required');
    if (changeStatusCode) {
      return res.status(400).json({ message: error.details[0].message });
    }

    return res.status(422).json({ message: error.details[0].message });
  }

  const productIds = await productsModels.findAllIdProducts();
  const invalidProducts = req.body.filter((item) => !productIds.includes(item.productId));

  if (invalidProducts.length > 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

module.exports = validateCreateSales;
