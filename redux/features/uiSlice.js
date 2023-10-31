import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isDarkMode: false,
  notification: null,
  isModalOpen: false,
  isLoginMode: true,
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

    toggleModal(state) {
      state.isModalOpen = !state.isModalOpen;
    },

    toggleLoginMode(state) {
      state.isLoginMode = !state.isLoginMode;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
