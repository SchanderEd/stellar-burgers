import { describe, test } from '@jest/globals';
import {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  initialState as testInitialState,
  burgerConstructorSliceReducer,
  TBurgerConstructor,
  resetConstructor
} from '../burger-constructor-slice/burger-constructor-slice';

const mockIngredient = {
  _id: '643d69a5c3f7b9001cfa0940',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

const mockBun = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

const mockMovedIngredient = {
  ...mockIngredient,
  _id: '643d69a5c3f7b9001cfa0941'
};

const mockConstructor = {
  bun: null,
  ingredients: []
};

describe('Тест burger-constructor-slice', () => {
  let state: TBurgerConstructor;

  beforeEach(() => {
    state = testInitialState;
  });

  test('Тест добавления ингредиента в конструктор', () => {
    const testAddIngredient = addIngredient(mockIngredient);
    state = burgerConstructorSliceReducer(state, testAddIngredient);

    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  test('Тест добавления булки в конструктор', () => {
    const testAddIngredient = addIngredient(mockBun);
    state = burgerConstructorSliceReducer(state, testAddIngredient);

    expect(state.bun).toMatchObject({
      ...mockBun,
      id: expect.any(String)
    });
  });

  test('Удаление ингредиента', () => {
    const testAddIngredient = addIngredient(mockIngredient);
    state = burgerConstructorSliceReducer(state, testAddIngredient);

    const testDeleteIngredient = deleteIngredient(state.ingredients[0].id);
    state = burgerConstructorSliceReducer(state, testDeleteIngredient);
    expect(state.ingredients).toEqual([]);
  });

  test('Перемещение ингредиента вниз', () => {
    state = burgerConstructorSliceReducer(state, addIngredient(mockIngredient));
    state = burgerConstructorSliceReducer(
      state,
      addIngredient(mockMovedIngredient)
    );

    const testMoveDownIngredient = moveDownIngredient(state.ingredients[0]);
    state = burgerConstructorSliceReducer(state, testMoveDownIngredient);
    expect(state.ingredients[1]._id).toEqual(mockIngredient._id);
    expect(state.ingredients[0]._id).toEqual(mockMovedIngredient._id);
  });

  test('Перемещение ингредиента вверх', () => {
    state = burgerConstructorSliceReducer(state, addIngredient(mockIngredient));
    state = burgerConstructorSliceReducer(
      state,
      addIngredient(mockMovedIngredient)
    );

    const testMoveUpIngredient = moveUpIngredient(state.ingredients[1]);
    state = burgerConstructorSliceReducer(state, testMoveUpIngredient);
    expect(state.ingredients[0]._id).toEqual(mockMovedIngredient._id);
    expect(state.ingredients[1]._id).toEqual(mockIngredient._id);
  });

  test('Сброс конструктора', () => {
    resetConstructor();
    expect(state).toEqual(mockConstructor);
  });
});
