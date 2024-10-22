import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      }),

      reducer: (
        state: TBurgerConstructor,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      }
    },
    deleteIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<string>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveUpIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );
      if (ingredientIndex > 0) {
        state.ingredients[ingredientIndex] =
          state.ingredients[ingredientIndex - 1];
        state.ingredients[ingredientIndex - 1] = action.payload;
      }
    },
    moveDownIngredient: (
      state: TBurgerConstructor,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const ingredientIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (ingredientIndex < state.ingredients.length) {
        state.ingredients[ingredientIndex] =
          state.ingredients[ingredientIndex + 1];
        state.ingredients[ingredientIndex + 1] = action.payload;
      }
    },
    resetConstructor: (state: TBurgerConstructor) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructor: (state: TBurgerConstructor) => state
  }
});

export const { getConstructor } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  resetConstructor
} = burgerConstructorSlice.actions;
export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
