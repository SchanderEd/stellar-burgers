import { expect } from '@jest/globals';
import store from './store';
import { initialState as ingredientsState } from '../slices/ingredients-slice/ingredients-slice';
import { initialState as constructorState } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { initialState as userState } from '../slices/user-slice/user-slice';
import { initialState as ordersState } from '../slices/orders-slice/orders-slice';
import { initialState as orderState } from '../slices/order-slice/order-slice';

describe('Тест rootReducer', () => {
  const initialState = store.getState();

  it('Иницилизация rootReducer', () => {
    expect(initialState).toEqual({
      ingredients: ingredientsState,
      burgerConstructor: constructorState,
      user: userState,
      ordersFeed: ordersState,
      order: orderState
    });
  });

  it('Получение неизвестного экшена', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(initialState);
  });
});
