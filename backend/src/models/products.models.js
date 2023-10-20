const connection = require('./connection');

const findAllProducts = async () => {
  const [products] = await connection.execute('SELECT * FROM products');
  return products;
};

const getProductById = async (productId) => {
  const [[product]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return product;
};

const createProduct = async (name) => {
  const [product] = await connection.execute(
    'INSERT INTO products (name) VALUES (?)',
    [name],
  );
  return { id: product.insertId, name };
};

const findAllIdProducts = async () => {
  const [products] = await connection.execute('SELECT id FROM products');
  return products.map((product) => product.id);
};

module.exports = {
  findAllProducts,
  getProductById,
  createProduct,
  findAllIdProducts,
};