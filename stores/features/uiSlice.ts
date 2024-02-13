import { createSlice } from '@reduxjs/toolkit';

export interface UiInitialState {
  isDarkMode: boolean;
  notification: { status: string | null; message: string | null };
  isModalOpen: boolean;
  modalContent: null | string;
  isLoginMode: boolean;
  isLoggedIn: boolean;
  isDropdownOpen: boolean;
}

let initialState = {
  isDarkMode: false,
  notification: { status: null, message: null },
  isModalOpen: false,
  modalContent: null,
  isLoginMode: true,
  isLoggedIn: false,
  isDropdownOpen: false,
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

    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },

    clearNotification(state) {
      state.notification = {
        status: null,
        message: null,
      };
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

    toggleDropdownMenu(state) {
      state.isDropdownOpen = !state.isDropdownOpen;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
