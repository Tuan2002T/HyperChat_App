// src/redux/navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentScreen: 'Splash', // Assuming 'Splash' is the initial screen
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = navigationSlice.actions;
export const selectCurrentScreen = (state) => state.navigation.currentScreen;
export default navigationSlice.reducer;