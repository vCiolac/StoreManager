const { salesModels, productsModels } = require('../models');

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

const deleteSaleById = async (saleId) => {
  const saleIds = await salesModels.findAllSalesId();
  if (!saleIds.includes(Number(saleId))) {
    return {
      statusCode: 404,
      data: { message: 'Sale not found' },
    };
  }
  await salesModels.deleteSale(saleId);
  return {
    statusCode: 204,
  };
};

const updateSaleQuantity = async (saleId, productId, quantity) => {
  const saleIds = await salesModels.findAllSalesId();
  if (!saleIds.includes(Number(saleId))) {
    return { statusCode: 404, data: { message: 'Sale not found' } };
  }
  const productIds = await productsModels.findAllIdProducts();
  if (!productIds.includes(Number(productId))) {
    return { statusCode: 404, data: { message: 'Product not found in sale' } };
  }
  const sale = await salesModels.getSaleById(saleId);
  await salesModels.updateSaleQuantity(saleId, productId, quantity);

  return {
    data: {
      saleId: Number(saleId),
      productId: Number(productId),
      quantity: Number(quantity),
      date: sale[0].date },
    statusCode: 200,
  };
};

module.exports = {
  findAllSales,
  getSaleById,
  createSales,
  deleteSaleById,
  updateSaleQuantity,
};
