import {configureStore} from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import languageReducer from './languageSlice';
import authReducer from './authSlice';
import screenReducer from './screenSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    navigation: navigationReducer,
    auth: authReducer,
    screen: screenReducer,
  },
});

export default store;
