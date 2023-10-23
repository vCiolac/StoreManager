const connection = require('./connection');

const findAllSales = async () => {
  const [sales] = await connection.execute(`
    SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    ORDER BY saleId ASC, productId ASC;
  `);
  return sales;
};

const getSaleById = async (saleId) => {
  const [sales] = await connection.execute(
    `SELECT
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY s.id ASC, productId ASC;
    `,
    [saleId],
  );
  return sales;
};

const createSaleTime = async () => {
  const [sale] = await connection.execute(
    'INSERT INTO sales VALUES ()',
  );
  return { id: sale.insertId };
};

const createSales = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );
};

const findAllSalesId = async () => {
  const [sales] = await connection.execute('SELECT id FROM sales');
  return sales ? sales.map((sale) => sale.id) : [];
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM sales WHERE id = ?',
    [id],
  );
};

const updateSaleQuantity = async (saleId, productId, quantity) => {
  await connection.execute(
    'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, saleId, productId],
  );
};

module.exports = {
  findAllSales,
  getSaleById,
  createSales,
  createSaleTime,
  findAllSalesId,
  deleteSale,
  updateSaleQuantity,
};
