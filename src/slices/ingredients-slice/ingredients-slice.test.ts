import { expect, jest, describe } from '@jest/globals';
import {
  getIngredients,
  ingredientsSliceReducer,
  initialState as testIngredientsState
} from './ingredients-slice';
import { TIngredient } from '../../utils/types';

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

const mockIngredients: TIngredient = {
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

describe('Тест ингредиентов', () => {
  it('Отправка запроса на получение ингредиентов', () => {
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

  it('Ингредиенты получены', () => {
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

  it('Ошибка получения ингредиентов', () => {
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
