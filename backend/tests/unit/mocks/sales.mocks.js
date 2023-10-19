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

const messageError = { message: 'Sale not found' };

const resultNotFoundMock = {
  statusCode: 404,
  message: 'Sale not found',
};

module.exports = {
  findAllSalesMock,
  getSaleByIdMock,
  resultFindAllMock,
  resultfindByIdMock,
  notFoundMock,
  resultNotFoundMock,
  messageError,
};
