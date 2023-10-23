const dateTime = '2023-10-19T16:44:04.000Z';

const findAllSalesMock = [
  {
    saleId: 1,
    date: dateTime,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: dateTime,
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: dateTime,
    productId: 3,
    quantity: 15,
  },
];

const getSaleByIdMock = [
  {
    date: '2023-10-19T17:16:44.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    date: '2023-10-19T17:16:44.000Z',
    productId: 2,
    quantity: 10,
  },
];

const resultFindAllMock = {
  statusCode: 200,
  data: [
    {
      saleId: 1,
      date: dateTime,
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: dateTime,
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: dateTime,
      productId: 3,
      quantity: 15,
    },
  ],
};

const resultfindByIdMock = {
  statusCode: 200,
  data: [
    {
      saleId: 1,
      date: dateTime,
      productId: 1,
      quantity: 5,
    },
  ],
};

const notFoundMock = undefined;

const resultNotFoundMock = {
  statusCode: 404,
  message: 'Sale not found',
};

const createMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const resultCreateMock = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const createErrorMock = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    quantity: 5,
  },
];

const validadeUpdateQuantityMock = {
  saleId: 2,
  productId: 3,
  quantity: 72,
  date: '2023-10-23T20:18:40.000Z',
};

const validadeParamsMock = {
  quantity: 72,
};

module.exports = {
  findAllSalesMock,
  getSaleByIdMock,
  resultFindAllMock,
  resultfindByIdMock,
  notFoundMock,
  resultNotFoundMock,
  createMock,
  resultCreateMock,
  createErrorMock,
  validadeUpdateQuantityMock,
  validadeParamsMock,
};
