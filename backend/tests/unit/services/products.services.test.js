const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const { 
  findAllMock,
  findByIdMock,
  messageError, 
  errorLenghtNameMock, 
  createProductMock } = require('../mocks/products.mocks');

describe('Testa o service de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
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
  it('Testa a criação de um novo produto', async function () {
    sinon.stub(productsModels, 'createProduct').resolves(createProductMock);

    const result = await productsService.createProduct('Produto de Teste');

    expect(result).to.be.an('object');
    expect(result.data).to.deep.equal(createProductMock);
  });
  it('Testa a validação de comprimento mínimo do nome', async function () {
    sinon.stub(productsModels, 'createProduct').resolves(errorLenghtNameMock);
  
    const result = await productsService.createProduct({ name: 'oi' });
  
    expect(result).to.be.an('object');
    expect(result.data).to.deep.equal({ message: '"name" length must be at least 5 characters long' });
  });
});
