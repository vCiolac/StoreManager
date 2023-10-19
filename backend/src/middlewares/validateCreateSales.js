const Joi = require('joi');

const schema = Joi.array().items(
  Joi.object({
    productId: Joi.number().integer().required().positive()
      .min(1)
      .label('productId'),
    quantity: Joi.number().integer().required().positive()
      .min(1)
      .label('quantity'),
  }).messages({
    'any.required': '{{#label}} is required',
    'number.base': '{{#label}} must be a number',
    'number.min': '{{#label}} must be greater than or equal to 1',
    'number.positive': '{{#label}} must be a positive number',
    'number.integer': '{{#label}} must be an integer',
  }),
);

const validateCreateSales = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

module.exports = validateCreateSales;