import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {UserModel} from '../../models';

export type AuthStateType = {
  isAuthenticated: boolean;
  user: null | UserModel;
  token: string | null;
  fcmToken: string | null;
};

export const initialState: AuthStateType = {
  isAuthenticated: false,
  //   token: token_api,
  token: null,
  user: null,
  fcmToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action: PayloadAction<UserModel | null>) => {
      state.user = action.payload;
    },

    logout: () => initialState,
    updateUser: (state, action: PayloadAction<Partial<UserModel>>) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
    setFCMToken: (state, action: PayloadAction<string | null>) => {
      state.fcmToken = action.payload;
    },
  },
});

export const {
  setToken,
  setUser,
  logout,
  updateUser,
  setAuthentication,
  setFCMToken,
} = authSlice.actions;

export default authSlice.reducer;
