const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');
const {
  findAllMock,
  findByIdMock,
  notFoundMock,
  resultUpdateMock,
} = require('../mocks/products.mocks');

describe('Testa o models de produtos', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Testa o método findAllProducts', async function () {
    sinon.stub(connection, 'execute').resolves([findAllMock]);

    const result = await productsModels.findAllProducts();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.an('object');
    expect(result[0].id).to.be.equal(1);
    expect(result[0].name).to.be.equal('Martelo de Thor');
  });
  it('Testa o método getProductById', async function () {
    const stubFunc = sinon.stub(connection, 'execute').resolves([findByIdMock]);

    const query = 'SELECT * FROM products WHERE id = ?';

    const result = await productsModels.getProductById(1);

    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(1);
    expect(result.name).to.be.equal('Martelo de Thor');
    expect(stubFunc.calledWith(query, [1])).to.be.equal(true);
  });
  it('Testa caso dê erro na busca', async function () {
    sinon.stub(connection, 'execute').resolves([[notFoundMock]]);

    const result = await productsModels.getProductById(500);

    expect(result).to.be.an('undefined');
  });
  it('Testa a criação de um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

    const result = await productsModels.createProduct('Produto de Teste');

    expect(result).to.be.an('object');
    expect(result.id).to.be.equal(4);
    expect(result.name).to.be.equal('Produto de Teste');
  });
  it('Testa o método findAllIdProducts', async function () {
    sinon.stub(connection, 'execute').resolves([[{ id: 1 }, { id: 2 }]]);

    const result = await productsModels.findAllIdProducts();

    expect(result).to.be.an('array');
    expect(result[0]).to.be.equal(1);
    expect(result[1]).to.be.equal(2);
  });
  it('Testa o método updateProductById', async function () {
    sinon.stub(connection, 'execute').resolves([{ row: 1 }]);

    const result = await productsModels.updateProductById('1', 'Martelo do Batman');

    expect(result).to.deep.equal(resultUpdateMock);
  });
  it('Testa o método deleteProductById', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const result = await productsModels.deleteProductById('1');

    expect(result).to.be.an('undefined');
  });
});
