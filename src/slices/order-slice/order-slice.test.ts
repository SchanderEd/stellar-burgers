import { expect, jest, describe } from '@jest/globals';
import {
  getOrderByNumber,
  initialState as testOrderState,
  orderSliceReducer,
  createOrder
} from './order-slice';

jest.mock('../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn(),
  getOrderByNumberApi: jest.fn()
}));

const mockOrder = {
  success: true,
  name: 'Краторный фалленианский бургер',
  order: {
    _id: '671603a9d829be001c777675',
    ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0947'],
    status: 'done',
    name: 'Краторный фалленианский бургер',
    createdAt: '2024-10-21T07:32:57.363Z',
    updatedAt: '2024-10-21T07:32:58.211Z',
    number: 57067
  }
};

const mockOrderByNumber = {
  success: true,
  orders: [
    {
      _id: '67162dfdd829be001c7776ee',
      owner: '67149f03d829be001c77728f',
      status: 'done',
      name: 'Флюоресцентный метеоритный бургер',
      createdAt: '2024-10-21T10:33:33.939Z',
      updatedAt: '2024-10-21T10:33:34.686Z',
      number: 57078,
      __v: 0
    }
  ]
};

describe('Проверка создания заказа', () => {
  it('Отправка запроса на создание заказа.', () => {
    const expectedState = {
      ...testOrderState,
      isLoading: true
    };

    const result = orderSliceReducer(testOrderState, {
      type: createOrder.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Успешный запрос на создание заказа.', () => {
    const expectedState = {
      ...testOrderState,
      orderData: mockOrder.order,
      isLoading: false,
      error: undefined
    };
    const testCreateOrder = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };

    const result = orderSliceReducer(testOrderState, testCreateOrder);
    expect(result).toEqual(expectedState);
  });

  it('Запрос на создание заказа падает с ошибкой', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testOrderState,
      isLoading: false,
      error: errorMessage
    };

    const testCreateOrder = {
      type: createOrder.rejected.type,
      error: { message: errorMessage }
    };

    const result = orderSliceReducer(testOrderState, testCreateOrder);
    expect(result).toEqual(expectedState);
  });
});

describe('Проверка получения заказа по номеру', () => {
  it('Отправка запроса на получение заказа по номеру', () => {
    const expectedState = {
      ...testOrderState,
      isLoading: true,
      error: undefined
    };

    const result = orderSliceReducer(testOrderState, {
      type: getOrderByNumber.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Успешная отправка запроса на получение заказа', () => {
    const expectedState = {
      ...testOrderState,
      selectedOrder: mockOrderByNumber.orders[0],
      isLoading: false,
      error: undefined
    };
    const testGetOrderByNumber = {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: mockOrderByNumber.orders }
    };
    const result = orderSliceReducer(testOrderState, testGetOrderByNumber);
    expect(result).toEqual(expectedState);
  });

  it('Ошибка при отправки запроса на получение заказа', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testOrderState,
      isLoading: false,
      error: errorMessage
    };
    const testGetOrderByNumber = {
      type: getOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const result = orderSliceReducer(testOrderState, testGetOrderByNumber);
    expect(result).toEqual(expectedState);
  });
});
