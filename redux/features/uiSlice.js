import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isDarkMode: false,
  notification: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    // 알림 박스
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },

    clearNotification(state) {
      state.notification = null;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
