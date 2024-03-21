import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers';
import navigationReducer from './navigationSlice';
import languageReducer from './languageSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    navigation: navigationReducer,
    auth: authReducer,
  },
});

export default store;
