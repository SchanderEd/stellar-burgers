import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSlice } from '../slices/burger-constructor-slice/burger-constructor-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer
});
