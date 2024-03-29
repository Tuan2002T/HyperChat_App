// redux/screenSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const screenSlice = createSlice({
  name: 'screen',
  initialState: {
    currentScreen: 'Splash',
  },
  reducers: {
    changeScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { changeScreen } = screenSlice.actions;
export const selectCurrentScreen = state => state.screen.currentScreen;
export default screenSlice.reducer;
