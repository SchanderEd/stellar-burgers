import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from '../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSlice } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { userSlice } from '../slices/user-slice/user-slice';
import { ordersFeedSliceReducer } from '../slices/orders-feed-slice/orders-feed-slice';
import { orderSliceReducer } from '../slices/order-slice/order-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  user: userSlice.reducer,
  ordersFeed: ordersFeedSliceReducer,
  order: orderSliceReducer
});
