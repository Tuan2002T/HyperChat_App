import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import languageReducer from './languageSlice';
import authReducer from './authSlice';
import screenReducer from './screenSlice';
import chatReducer from './chatSlice';

import userReducer from './userSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    language: languageReducer,
    navigation: navigationReducer,
    screen: screenReducer,

    chat: chatReducer,

  },
});

export default store;
