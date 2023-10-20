const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const validateBodyCreateSales = require('../../../src/middlewares/validateBodyCreateSales');

describe('Testa o validateBodyCreateSales Middleware', function () {
  it('Deve validar o body corretamente', function () {
    const req = { body: [{ productId: 1, quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validateBodyCreateSales(req, res, next);
  });

  it('Deve retornar um erro pois o body está faltando', function () {
    const req = { body: [] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validateBodyCreateSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('Deve retornar um erro pois o productId está faltando', function () {
    const req = { body: [{ quantity: 5 }] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validateBodyCreateSales(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
  });
});
