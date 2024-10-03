import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSliceReducer } from '../slices/ingredients-slice/ingredients-slice';
import { burgerConstructorSliceReducer } from '../slices/burger-constructor-slice/burger-constructor-slice';
import { userSliceReducer } from '../slices/user-slice/user-slice';
import { ordersFeedSliceReducer } from '../slices/orders-feed-slice/orders-feed-slice';
import { orderSliceReducer } from '../slices/order-slice/order-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  user: userSliceReducer,
  ordersFeed: ordersFeedSliceReducer,
  order: orderSliceReducer
});
