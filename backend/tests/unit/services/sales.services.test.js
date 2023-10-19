const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../src/services/sales.services');
const salesModels = require('../../../src/models/sales.models');
const { 
  findAllSalesMock,
  getSaleByIdMock,
  messageError } = require('../mocks/sales.mocks');

describe('Testa o service de produtos', function () {
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
    sinon.stub(salesModels, 'getSaleById').resolves(messageError);

    const result = await salesService.getSaleById(500);

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(messageError);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
