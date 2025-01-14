const { salesServices } = require('../services');

const findAllSales = async (_req, res) => {
  const { statusCode, data } = await salesServices.findAllSales();
  return res.status(statusCode).json(data);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { statusCode, data } = await salesServices.getSaleById(id);
  return res.status(statusCode).json(data);
};

const createSales = async (req, res) => {
  const { body } = req;
  const { statusCode, data } = await salesServices.createSales(body);
  return res.status(statusCode).json(data);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const { statusCode, data } = await salesServices.deleteSaleById(id);
  return res.status(statusCode).json(data);
};

const updateSaleQuantity = async (req, res) => {
  const { id, productId } = req.params;
  const { quantity } = req.body;
  const { data, statusCode } = await salesServices.updateSaleQuantity(id, productId, quantity);
  return res.status(statusCode).json(data);
};

module.exports = {
  findAllSales,
  getSaleById,
  createSales,
  deleteSaleById,
  updateSaleQuantity,
};