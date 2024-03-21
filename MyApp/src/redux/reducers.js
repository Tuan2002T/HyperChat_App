// src/redux/reducers.js
import { createReducer } from '@reduxjs/toolkit';
import { setUserToken, setIsLoggedIn, logout } from './actions';

const initialState = {
  userToken: null,
  isLoggedIn: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUserToken, (state, action) => {
      state.userToken = action.payload;
    })
    .addCase(setIsLoggedIn, (state, action) => {
      state.isLoggedIn = action.payload;
    })
    .addCase(logout, (state) => {
      state.userToken = null;
      state.isLoggedIn = false;
    });
});

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authReducer;
