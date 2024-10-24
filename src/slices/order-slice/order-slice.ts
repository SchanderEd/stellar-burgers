import { getOrderByNumberApi, orderBurgerApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderSlice = {
  orderData: TOrder | null;
  selectedOrder: TOrder | null;
  isLoading: boolean;
  error: string | undefined;
};

export const initialState: TOrderSlice = {
  orderData: null,
  selectedOrder: null,
  isLoading: false,
  error: undefined
};

export const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (data: number) => getOrderByNumberApi(data)
);

export const createOrder = createAsyncThunk(
  'order/new',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    if (!response.success) {
      return response;
    }

    return response;
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state: TOrderSlice) => {
      state.orderData = null;
    }
  },
  selectors: {
    getOrdersSelectors: (state: TOrderSlice) => state,
    getOrderData: (state: TOrderSlice) => state.orderData,
    getSelectedOrder: (state: TOrderSlice) => state.selectedOrder,
    getOrderRequest: (state: TOrderSlice) => state.isLoading
  },
  extraReducers(builder) {
    builder
      .addCase(getOrderByNumber.pending, (state: TOrderSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state: TOrderSlice, action) => {
        state.selectedOrder = action.payload.orders[0];
        state.isLoading = false;
      })
      .addCase(getOrderByNumber.rejected, (state: TOrderSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state: TOrderSlice) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(createOrder.fulfilled, (state: TOrderSlice, action) => {
        state.isLoading = false;
        state.orderData = action.payload.order;
      })
      .addCase(createOrder.rejected, (state: TOrderSlice, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrderData, getOrderRequest, getSelectedOrder } =
  orderSlice.selectors;
export const { clearOrderData } = orderSlice.actions;
export const orderSliceReducer = orderSlice.reducer;
