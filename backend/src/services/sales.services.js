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

const createSales = async (body) => {
  const newSale = await salesModels.createSaleTime();

  const insertionPromises = body.map(async (sale) => {
    const { productId, quantity } = sale;
    await salesModels.createSales(newSale.id, productId, quantity);
  });

  await Promise.all(insertionPromises);

  const result = {
    id: newSale.id,
    itemsSold: body,
  };

  return { statusCode: 201, data: result };
};

module.exports = {
  findAllSales,
  getSaleById,
  createSales,
};
