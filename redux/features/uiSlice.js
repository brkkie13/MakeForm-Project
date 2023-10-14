import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isDarkMode: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
