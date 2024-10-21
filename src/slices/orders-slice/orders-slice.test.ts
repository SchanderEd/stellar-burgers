import { expect, describe } from '@jest/globals';
import {
  getOrdersFeed,
  initialState as testInititalState,
  ordersSliceReducer,
  TOrdersSlice
} from './orders-slice';

jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn()
}));

const mockOrders: TOrdersSlice = {
  orders: [
    {
      _id: '671603a9d829be001c777675',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa0947'],
      status: 'done',
      name: 'Краторный фалленианский бургер',
      createdAt: '2024-10-21T07:32:57.363Z',
      updatedAt: '2024-10-21T07:32:58.211Z',
      number: 57067
    },
    {
      _id: '6715fe4ed829be001c77766a',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-10-21T07:10:06.246Z',
      updatedAt: '2024-10-21T07:10:06.860Z',
      number: 57066
    }
  ],
  feed: [],
  errors: undefined,
  isLoading: false,
  total: 56693,
  totalToday: 86
};

describe('Тест order-slice', () => {
  it('Отправка запроса. Статус isLoading меняется на true', () => {
    const expectedState = {
      ...testInititalState,
      isLoading: true
    };

    const result = ordersSliceReducer(testInititalState, { type: getOrdersFeed.pending.type });
    expect(result).toEqual(expectedState);
  });

  it('Запрос успешно отправлен, получена лента заказов', () => {
    const expectedState = {
      ...testInititalState,
      isLoading: false,
      feed: mockOrders.orders,
      total: mockOrders.total,
      totalToday: mockOrders.totalToday
    };
    const testGetOrdersFeed = {
      type: getOrdersFeed.fulfilled.type,
      payload: mockOrders
    };
    const result = ordersSliceReducer(testInititalState, testGetOrdersFeed);
    expect(result).toEqual(expectedState);
  });

  it('Запрос падает в ошибку, получено сообщение об ошибке', () => {
    const error = 'Ошибка при загрузке данных';
    const expectedState = {
      ...testInititalState,
      isLoading: false,
      errors: error
    };
    const testGetOrdersFeed = {
      type: getOrdersFeed.rejected.type,
      error: { message: error }
    };
    const result = ordersSliceReducer(testInititalState, testGetOrdersFeed);
    expect(result).toEqual(expectedState);
  });
});
