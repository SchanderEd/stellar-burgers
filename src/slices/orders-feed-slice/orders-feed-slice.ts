import { getFeedsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersFeedSlice = {
  orders: TOrder[];
  isLoading: boolean;
  errors: string | undefined;
  total: number;
  totalToday: number;
};

export const getOrdersFeed = createAsyncThunk('feed/get', getFeedsApi);

const initialState: TOrdersFeedSlice = {
  orders: [],
  isLoading: false,
  errors: undefined,
  total: 0,
  totalToday: 0
};

export const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersFeedSelectors: (state: TOrdersFeedSlice) => state.orders,
    getFeedTotal: (state: TOrdersFeedSlice) => state
  },
  extraReducers(builder) {
    builder
      .addCase(getOrdersFeed.pending, (state: TOrdersFeedSlice) => {
        state.isLoading = true;
        state.errors = undefined;
      })
      .addCase(getOrdersFeed.fulfilled, (state: TOrdersFeedSlice, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      })
      .addCase(getOrdersFeed.rejected, (state: TOrdersFeedSlice, action) => {
        state.errors = action.error.message;
      });
  }
});

export const ordersFeedSelectors = ordersFeedSlice.selectors;
export const ordersFeedSliceReducer = ordersFeedSlice.reducer;
