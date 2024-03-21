// src/redux/actions.js
import { createAction } from '@reduxjs/toolkit';

export const setUserToken = createAction('auth/setUserToken');
export const setIsLoggedIn = createAction('auth/setIsLoggedIn');
export const logout = createAction('auth/logout');