const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
const {
  validadeUpdateQuantity,
  validadeParams,
} = require('../../../src/middlewares/validadeUpdateQuantity');

describe('Testa o validadeUpdateQuantity e validadeParams', function () {
  it('Deve retornar um erro pois o body está faltando', function () {
    const req = { body: [] };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validadeUpdateQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
  });

  it('Deve retornar um erro pois o id está faltando', function () {
    const req = { body: [{ quantity: 5 }], params: { productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validadeParams(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"id" is required' });
  });

  it('Deve retornar um erro pois o productId é diferente do esperado', function () {
    const req = { body: [{ quantity: 5 }], params: { id: 1, productId: 'xablei' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validadeParams(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"productId" must be a number' });
  });

  it('Deve retornar um erro pois o Id é diferente do esperado', function () {
    const req = { body: [{ quantity: 5 }], params: { id: 0, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validadeParams(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"id" is required' });
  });

  it('Deve retornar um erro pois quantity é diferente do esperado', function () {
    const req = { body: [{ quantity: 0 }], params: { id: 1, productId: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };
    const next = sinon.spy();

    validadeUpdateQuantity(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"value" must be of type object' });
  });
});
