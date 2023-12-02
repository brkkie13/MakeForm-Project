import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  isDarkMode: false,
  notification: null,
  isModalOpen: false,
  modalContent: null,
  isLoginMode: true,
  isLoggedIn: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    loadTheme(state, action) {
      const theme = action.payload;
      state.isDarkMode = theme === 'dark';
    },

    changeThemeMode(state) {
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

    openModal(state, action) {
      state.isModalOpen = true;
      state.modalContent = action.payload;
    },

    closeModal(state) {
      state.isModalOpen = false;
      state.modalContent = null;
    },

    toggleLoginMode(state) {
      state.isLoginMode = !state.isLoginMode;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
