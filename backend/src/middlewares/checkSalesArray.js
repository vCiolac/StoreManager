const checkSalesArray = (req, res, next) => {
  const { body } = req;

  if (!body || body.length === 0) {
    return res.status(400).json({ message: 'Product not found' });
  }

  next();
};

module.exports = checkSalesArray;