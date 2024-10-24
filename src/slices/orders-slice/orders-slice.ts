import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TOrdersSlice = {
  orders: TOrder[];
  feed: TOrder[];
  isLoading: boolean;
  errors: string | undefined;
  total: number;
  totalToday: number;
};

export const getOrdersFeed = createAsyncThunk('feed/get', getFeedsApi);
export const getOrders = createAsyncThunk('orders/get', getOrdersApi);

export const initialState: TOrdersSlice = {
  orders: [],
  feed: [],
  isLoading: false,
  errors: undefined,
  total: 0,
  totalToday: 0
};

export const ordersSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelectors: (state: TOrdersSlice) => state
  },
  extraReducers(builder) {
    builder
      .addCase(getOrdersFeed.pending, (state: TOrdersSlice) => {
        state.isLoading = true;
        state.errors = undefined;
      })
      .addCase(getOrdersFeed.fulfilled, (state: TOrdersSlice, action) => {
        state.feed = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getOrdersFeed.rejected, (state: TOrdersSlice, action) => {
        state.errors = action.error.message;
      })
      .addCase(getOrders.pending, (state: TOrdersSlice) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state: TOrdersSlice, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(getOrders.rejected, (state: TOrdersSlice, action) => {
        state.isLoading = false;
        state.errors = action.error.message;
      });
  }
});

export const { getOrdersSelectors } = ordersSlice.selectors;
export const ordersSliceReducer = ordersSlice.reducer;
