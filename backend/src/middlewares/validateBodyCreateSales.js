const validateBodyCreateSales = (req, res, next) => {
  const { body } = req;

  if (!body || body.length === 0) {
    return res.status(400).json({ message: 'Product not found' });
  }

  const hasInvalidFields = body.some((item) => {
    const { productId } = item;
    if (!productId) {
      return res.status(400).json({ message: '"productId" is required' });
    }
    return false;
  });

  if (!hasInvalidFields) {
    next();
  }
};

module.exports = validateBodyCreateSales;
