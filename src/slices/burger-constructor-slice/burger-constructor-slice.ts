import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBurgerConstructor = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructor = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    getConstructor: (state: TBurgerConstructor) => state
  }
});

export const burgerConstructorSelector = burgerConstructorSlice.selectors;
export const burgerConstructorSliceReducer = burgerConstructorSlice.reducer;
