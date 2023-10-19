const { salesModels } = require('../models');

const findAllSales = async () => {
  const sales = await salesModels.findAllSales();
  return {
    statusCode: 200,
    data: sales,
  };
};

const getSaleById = async (saleId) => {
  const sale = await salesModels.getSaleById(saleId);
  if (sale.length === 0) {
    return {
      statusCode: 404,
      data: { message: 'Sale not found' },
    };
  }
  return {
    statusCode: 200,
    data: sale,
  };
};

module.exports = {
  findAllSales,
  getSaleById,
};
