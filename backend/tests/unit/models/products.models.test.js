const { expect } = require('chai');
const sinon = require('sinon');
const productsModels = require('../../../src/models/products.models');
const connection = require('../../../src/models/connection');
const {
  findAllMock,
  findByIdMock,
  notFoundMock } = require('../mocks/products.mocks');

describe('Testa o models de produtos', function () {
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
  afterEach(function () {
    sinon.restore();
  });
});