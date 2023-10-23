const Joi = require('joi');

const schema = Joi.object({
  quantity: Joi.number().integer().required()
    .min(1)
    .label('quantity'),
}).messages({
  'any.required': '{{#label}} is required',
  'number.base': '{{#label}} must be a number',
  'number.min': '{{#label}} must be greater than or equal to 1',
});

const validadeUpdateQuantity = async (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const changeStatusCode = error.details.find((detail) => detail.type === 'any.required');
    if (changeStatusCode) {
      return res.status(400).json({ message: error.details[0].message });
    }

    return res.status(422).json({ message: error.details[0].message });
  }
  return next();
};

const validadeParams = (req, res, next) => {
  const { id, productId } = req.params;
  if (!id) { return res.status(422).json({ message: '"id" is required' }); }
  if (!productId) { return res.status(422).json({ message: '"productId" is required' }); }
  const paramSchema = Joi.object({
    id: Joi.number().integer().min(1).required(),
    productId: Joi.number().integer().min(1).required(),
  });

  const { error } = paramSchema.validate(req.params);

  if (error) {
    return res.status(422).json({ message: error.details[0].message });
  }

  return next();
};

module.exports = { validadeUpdateQuantity, validadeParams };
