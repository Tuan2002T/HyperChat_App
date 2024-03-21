// src/redux/languageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'vi',
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export const selectLanguage = state => state.language.language;
export default languageSlice.reducer;
