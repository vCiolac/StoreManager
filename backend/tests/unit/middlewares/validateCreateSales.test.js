const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateCreateSales = require('../../../src/middlewares/validateCreateSales');
const { productsModels } = require('../../../src/models');

chai.use(sinonChai);

describe('Middleware validateCreateSales', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('deve chamar o próximo middleware se o corpo da solicitação for válido', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 5 },
        { productId: 2, quantity: 10 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    sinon.stub(productsModels, 'findAllIdProducts').resolves([1, 2]);

    await validateCreateSales(req, res, next);
    expect(next).to.have.been.calledWith();
  });

  it('Verificar se body contem ambos valores', async function () {
    const req = {
      body: [{ productId: 1 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    await validateCreateSales(req, res, next);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
  });

  it('Deve retornar um erro se tiver campos faltando', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 5 },
        { quantity: 10 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    sinon.stub(productsModels, 'findAllIdProducts').resolves([1, 2]);

    await validateCreateSales(req, res, next);

    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"productId" is required' });
  });

  it('deve retornar status 404 se houver produtos inválidos', async function () {
    const req = {
      body: [
        { productId: 1, quantity: 5 },
        { productId: 3, quantity: 10 },
      ],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    sinon.stub(productsModels, 'findAllIdProducts').resolves([1, 2]);

    await validateCreateSales(req, res, next);

    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });
});
