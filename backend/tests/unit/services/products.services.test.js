const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const { 
  findAllMock,
  findByIdMock,
  messageError } = require('../mocks/products.mocks');

describe('Testa o service de produtos', function () {
  it('Testa o método findAllProducts', async function () {
    sinon.stub(productsModels, 'findAllProducts').resolves(findAllMock);

    const result = await productsService.findAllProducts();

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(findAllMock);
  });
  
  it('Testa o método getProductById', async function () {
    sinon.stub(productsModels, 'getProductById').resolves(findByIdMock);

    const result = await productsService.getProductById(1);

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(findByIdMock);
  });

  it('Testa caso dê erro na busca', async function () {
    sinon.stub(productsModels, 'getProductById').resolves(messageError);

    const result = await productsService.getProductById(500);

    expect(result).to.be.an('object');
    expect(result.data).to.be.equal(messageError);
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
