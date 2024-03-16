// navigationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    currentScreen: null,
  },
  reducers: {
    setCurrentScreen: (state, action) => {
      state.currentScreen = action.payload;
    },
  },
});

export const { setCurrentScreen } = navigationSlice.actions;
export const selectCurrentScreen = state => state.navigation.currentScreen;

export default navigationSlice.reducer;
