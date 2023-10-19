const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const salesControllers = require('../../../src/controllers/sales.controllers');
const salesService = require('../../../src/services/sales.services');
const { 
  resultFindAllMock,
  resultfindByIdMock,
  resultNotFoundMock } = require('../mocks/sales.mocks');

chai.use(sinonChai);

describe('Testa o controller de sales', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa o método findAllSales', async function () {
    sinon.stub(salesService, 'findAllSales').resolves(resultFindAllMock);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesControllers.findAllSales(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(resultFindAllMock.data);
  });
  it('Testa o método getSaleById', async function () {
    sinon.stub(salesService, 'getSaleById').resolves(resultfindByIdMock);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesControllers.getSaleById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(resultfindByIdMock.data);
  });
  it('Testa caso dê erro na busca', async function () {
    sinon.stub(salesService, 'getSaleById').resolves(resultNotFoundMock);

    const req = { params: { id: 500 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesControllers.getSaleById(req, res);
    
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith(resultNotFoundMock.data);
  });
});