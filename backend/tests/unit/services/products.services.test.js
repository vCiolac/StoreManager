const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../src/services/products.services');
const productsModels = require('../../../src/models/products.models');
const {
  findAllMock,
  findByIdMock,
  notFoundMock,
  errorLenghtNameMock,
  createProductMock,
  resultUpdateMock,
} = require('../mocks/products.mocks');

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

  it('Testa caso dê erro no método getProductById', async function () {
    sinon.stub(productsModels, 'getProductById').resolves(notFoundMock);

    const result = await productsService.getProductById(500);

    expect(result).to.be.an('object');
    expect(result.statusCode).to.be.equal(404);
    expect(result.data).to.deep.equal({ message: 'Product not found' });
  });

  it('Testa erro no método createProduct', async function () {
    sinon.stub(productsModels, 'createProduct').resolves(errorLenghtNameMock);

    const result = await productsService.createProduct('abc');

    expect(result).to.be.an('object');
    expect(result.statusCode).to.be.equal(422);
    expect(result.data).to.deep.equal(errorLenghtNameMock);
  });

  it('Testa a criação de um novo produto', async function () {
    sinon.stub(productsModels, 'createProduct').resolves(createProductMock);

    const result = await productsService.createProduct('Produto de Teste');

    expect(result).to.be.an('object');
    expect(result.data).to.deep.equal(createProductMock);
  });

  it('Testa o método updateProductByIdMock', async function () {
    sinon.stub(productsModels, 'updateProductById').resolves(resultUpdateMock);

    const result = await productsService.updateProductById('1', 'Martelo de Thor');

    expect(result).to.be.an('object');
    expect(result.data).to.deep.equal({ id: 1, name: 'Martelo do Batman' });
  });
});
