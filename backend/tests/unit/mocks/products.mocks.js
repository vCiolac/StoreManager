const findAllMock = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];

const findByIdMock = [{
  id: 1,
  name: 'Martelo de Thor',
}];

const notFoundMock = undefined;

const messageError = { message: 'Product not found' };

const resultNotFoundMock = {
  statusCode: 404,
  message: 'Product not found',
};

const resultFindAllMock = {
  statusCode: 200,
  data: [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ],
};

const resultfindByIdMock = {
  statusCode: 200,
  data: [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
  ],
};

const createProductMock = {
  statusCode: 201,
  data: [
    {
      id: 4,
      name: 'Produto de Teste',
    },
  ],
};

const createProduct = [{
  id: 4,
  name: 'Produto de Teste',
}];

const errorNameMock = { message: '"name" is required' };

const errorLenghtNameMock = { message: '"name" length must be at least 5 characters long' };

module.exports = {
  findAllMock,
  findByIdMock,
  notFoundMock,
  messageError,
  resultFindAllMock,
  resultfindByIdMock,
  resultNotFoundMock,
  createProductMock,
  createProduct,
  errorNameMock,
  errorLenghtNameMock,
};
