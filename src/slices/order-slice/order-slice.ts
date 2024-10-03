import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSlice = {
  orderData: TOrder;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TOrderSlice = {
  orderData: {
    createdAt: '',
    ingredients: [],
    _id: '',
    status: '',
    name: '',
    updatedAt: 'string',
    number: 0
  },
  isLoading: false,
  error: undefined
};

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (data: number) => getOrderByNumberApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelectors: (state: TOrderSlice) => state,
    getOrderData: (state: TOrderSlice) => state.orderData
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state: TOrderSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state: TOrderSlice, action) => {
        state.orderData = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state: TOrderSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrderData } = orderSlice.selectors;
export const orderSliceReducer = orderSlice.reducer;
