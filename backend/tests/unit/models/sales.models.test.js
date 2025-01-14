const { expect } = require('chai');
const sinon = require('sinon');
const salesModels = require('../../../src/models/sales.models');
const connection = require('../../../src/models/connection');
const {
  findAllSalesMock,
  getSaleByIdMock,
  notFoundMock } = require('../mocks/sales.mocks');

describe('Testa o models de sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa o método findAllSales', async function () {
    sinon.stub(connection, 'execute').resolves([findAllSalesMock]);

    const result = await salesModels.findAllSales();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].saleId).to.be.equal(1);
    expect(result[0].quantity).to.be.equal(5);
  });
  it('Testa o método getSaleById', async function () {
    const stubFunc = sinon.stub(connection, 'execute').resolves([getSaleByIdMock]);

    const query = `
    SELECT
      s.id AS saleId,
      s.date,
      sp.product_id AS productId,
      sp.quantity
    FROM sales AS s
    INNER JOIN sales_products AS sp ON s.id = sp.sale_id
    WHERE s.id = ?
    ORDER BY saleId ASC, productId ASC;
    `;

    const result = await salesModels.getSaleById(1);

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].productId).to.be.equal(1);
    expect(result[0].quantity).to.be.equal(5);
    expect(stubFunc.calledWith(query, [1])).to.be.equal(false);
  });
  it('Testa caso dê erro na busca', async function () {
    sinon.stub(connection, 'execute').resolves([notFoundMock]);

    const result = await salesModels.getSaleById(500);

    expect(result).to.be.an('undefined');
  });
  it('Testa o método createSaleTime', async function () {
    const stubFunc = sinon.stub(connection, 'execute').resolves([{ insertId: 21 }]);

    const query = 'INSERT INTO sales VALUES ()';

    const result = await salesModels.createSaleTime();

    expect(result).to.be.an('object');
    expect(result).to.be.deep.equal({ id: 21 });
    expect(stubFunc.calledWith(query, [])).to.be.equal(false);
  });
  it('Testa o método createSales', async function () {
    const stubFunc = sinon.stub(connection, 'execute').resolves([{ insertId: 21 }]);

    const query = 'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)';

    const result = await salesModels.createSales(21, 1, 5);

    expect(result).to.be.an('undefined');
    expect(stubFunc.calledWith(query, [21, 1, 5])).to.be.equal(true);
  });
  it('Testa o método findAllSalesId', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await salesModels.findAllSalesId();

    expect(result).to.be.an('array');
  });
  it('Testa o método deleteSale', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await salesModels.deleteSale('1');

    expect(result).to.be.an('undefined');
  });
  it('Testa o método updateSaleQuantity', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await salesModels.updateSaleQuantity('1', '1', '1');

    expect(result).to.be.an('undefined');
  });
});