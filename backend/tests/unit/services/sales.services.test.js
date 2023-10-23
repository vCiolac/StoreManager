const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');
const { 
  findAllSalesMock,
  getSaleByIdMock,
  createMock,
  resultCreateMock,
} = require('../mocks/sales.mocks');

describe('Testa o service de sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa o método findAllSales', async function () {
    sinon.stub(salesModels, 'findAllSales').resolves(findAllSalesMock);

    const result = await salesService.findAllSales();

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(findAllSalesMock);
  });
  
  it('Testa o método getSaleById', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves(getSaleByIdMock);

    const result = await salesService.getSaleById(1);

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(getSaleByIdMock);
  });

  it('Testa caso dê erro na busca', async function () {
    sinon.stub(salesModels, 'getSaleById').resolves([]);
  
    const result = await salesService.getSaleById(500);
  
    expect(result).to.be.an('object');
    expect(result.data).to.deep.equal({ message: 'Sale not found' });
  });
  
  it('Testa o método createSales', async function () {
    sinon.stub(salesModels, 'createSales').resolves(resultCreateMock);

    const result = await salesService.createSales(createMock);

    expect(result).to.be.an('object');
    expect(result.data.itemsSold).to.deep.equal(resultCreateMock.itemsSold);
  });

  it('Testa o método deleteSale', async function () {
    sinon.stub(salesModels, 'deleteSale').resolves();

    const result = await salesService.deleteSaleById(1);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.be.equal(404);
  });
});
