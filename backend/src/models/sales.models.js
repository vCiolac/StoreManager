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

module.exports = {
  findAllSales,
  getSaleById,
};
