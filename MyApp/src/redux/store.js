import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './reducers/languageSlice';

export default configureStore({
  reducer: {
    language: languageReducer,
  },
});
