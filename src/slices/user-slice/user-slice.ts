import { getUserApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserSlice = {
  isAuthorization: boolean;
  isAuthentication: boolean;
  user: TUser | undefined;
  error: string | undefined;
  isLoading: boolean;
};

const initialState: TUserSlice = {
  isAuthorization: false,
  isAuthentication: false,
  user: undefined,
  error: undefined,
  isLoading: false
};

export const getUser = createAsyncThunk('user/get', async () => {
  const responseUser = await getUserApi();

  if (!responseUser.success) {
    return responseUser;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelectors: (state: TUserSlice) => state
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state: TUserSlice) => {
        (state.isLoading = true), (state.isAuthentication = false);
      })
      .addCase(getUser.fulfilled, (state: TUserSlice, action) => {
        state.isAuthorization = true;
        state.isAuthentication = true;
        state.user = action.payload?.user;
        state.error = undefined;
        state.isLoading = false;
      })
      .addCase(getUser.rejected, (state: TUserSlice, action) => {
        state.isAuthorization = false;
        state.isAuthentication = true;
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
});

export const userSelectors = userSlice.selectors;
export const userSliceReducer = userSlice.reducer;
