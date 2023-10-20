const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productsControllers = require('../../../src/controllers/products.controllers');
const productsService = require('../../../src/services/products.services');
const { 
  resultFindAllMock,
  resultfindByIdMock,
  resultNotFoundMock,
  createProductMock,
  errorNameMock,
  updateProductByIdMock,
  resultUpdateMock,
} = require('../mocks/products.mocks');

chai.use(sinonChai);

describe('Testa o controller de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa o método findAllProducts', async function () {
    sinon.stub(productsService, 'findAllProducts').resolves(resultFindAllMock);

    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsControllers.findAllProducts(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(resultFindAllMock.data);
  });
  it('Testa o método getProductById', async function () {
    sinon.stub(productsService, 'getProductById').resolves(resultfindByIdMock);

    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsControllers.getProductById(req, res);

    expect(res.status).to.be.calledWith(200);
    expect(res.json).to.be.calledWith(resultfindByIdMock.data);
  });
  it('Testa caso dê erro na busca', async function () {
    sinon.stub(productsService, 'getProductById').resolves(resultNotFoundMock);

    const req = { params: { id: 500 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsControllers.getProductById(req, res);
    
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith(resultNotFoundMock.data);
  });
  it('Testa a criação de um produto', async function () {
    sinon.stub(productsService, 'createProduct').resolves(createProductMock);

    const req = { body: { name: 'Produto de Teste' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsControllers.createProduct(req, res);

    expect(res.status).to.be.calledWith(201);
    expect(res.json).to.be.calledWith(createProductMock.data);
  });
  it('Testa a validação de nome obrigatório', async function () {
    sinon.stub(productsService, 'createProduct').resolves(errorNameMock);
  
    const req = { body: { name: '' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsControllers.createProduct(req, res);
  
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });
  it('Testa o método updateProductById', async function () {
    sinon.stub(productsService, 'updateProductById').resolves(updateProductByIdMock);
  
    const req = { params: { id: 1 }, body: { name: 'Martelo do Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsControllers.updateProductById(req, res);
    expect(res.json).to.be.calledWith(resultUpdateMock.data);
  });
  it('Testa o método deleteProductById', async function () {
    sinon.stub(productsService, 'deleteProductById').resolves({ statusCode: 204 });
  
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await productsControllers.deleteProductById(req, res);
    expect(res.status).to.be.calledWith(204);
    expect(res.json).to.be.calledWith();
  });
});