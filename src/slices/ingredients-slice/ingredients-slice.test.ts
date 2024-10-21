import { expect, jest, describe } from '@jest/globals';
import {
  getIngredients,
  initialState as testIngredientsState,
  ingredientsSliceReducer
} from './ingredients-slice';

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients = {
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

describe('Тест ingredient-slice', () => {
  it('Отправка запроса. isLoading переходит в true', () => {
    const expectedState = {
      ...testIngredientsState,
      isLoading: true,
      error: undefined
    };

    const result = ingredientsSliceReducer(testIngredientsState, {
      type: getIngredients.pending.type
    });
    expect(result).toEqual(expectedState);
  });

  it('Запрос успешный. Получен ингредиент.', () => {
    const expectedState = {
      ingredients: [mockIngredients],
      isLoading: false,
      error: undefined
    };
    const testGetIngredient = {
      type: getIngredients.fulfilled.type,
      payload: [mockIngredients]
    };
    const result = ingredientsSliceReducer(
      testIngredientsState,
      testGetIngredient
    );
    expect(result).toEqual(expectedState);
  });

  it('Запрос упал с ошибкой.', () => {
    const errorMessage = 'Ошибка при загрузке данных';

    const expectedState = {
      ...testIngredientsState,
      isLoading: false,
      error: errorMessage
    };

    const testGetIngredient = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };

    const result = ingredientsSliceReducer(
      testIngredientsState,
      testGetIngredient
    );
    expect(result).toEqual(expectedState);
  });
});
