const { productsModels } = require('../models');

const findAllProducts = async () => {
  const products = await productsModels.findAllProducts();
  return {
    statusCode: 200,
    data: products,
  };
};

const getProductById = async (productId) => {
  const product = await productsModels.getProductById(productId);
  if (!product) {
    return {
      statusCode: 404,
      data: { message: 'Product not found' },
    };
  }
  return {
    statusCode: 200,
    data: product,
  };
};

const createProduct = async (name) => {
  const product = await productsModels.createProduct(name);
  if (name.length < 5) {
    return {
      statusCode: 422,
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }
  return {
    statusCode: 201,
    data: product,
  };
};

const updateProductById = async (productId, newName) => {
  if (newName.length < 5) {
    return {
      statusCode: 422,
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }
  const productIds = await productsModels.findAllIdProducts();
  if (!productIds.includes(Number(productId))) {
    return {
      statusCode: 404,
      data: { message: 'Product not found' },
    };
  }
  const { id, name } = await productsModels.updateProductById(productId, newName);
  return {
    statusCode: 200,
    data: { id: Number(id), name },
  };
};

module.exports = {
  findAllProducts,
  getProductById,
  createProduct,
  updateProductById,
};
