const { productsServices } = require('../services');

const findAllProducts = async (_req, res) => {
  const { statusCode, data } = await productsServices.findAllProducts();
  return res.status(statusCode).json(data);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { statusCode, data } = await productsServices.getProductById(id);
  return res.status(statusCode).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { statusCode, data } = await productsServices.createProduct(name);
  return res.status(statusCode).json(data);
};

const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { statusCode, data } = await productsServices.updateProductById(id, name);
  return res.status(statusCode).json(data);
};

module.exports = {
  findAllProducts,
  getProductById,
  createProduct,
  updateProductById,
};
