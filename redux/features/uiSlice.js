import { createSlice } from '@reduxjs/toolkit';
import { startAfter } from 'firebase/firestore';

let initialState = {
  isDarkMode: localStorage.getItem('theme') === 'dark', // 로컬스토리지에서 가져온 값을 초기상태로 설정
  notification: null,
  isModalOpen: false,
  modalContent: null,
  isConfirmed: false,
  isLoginMode: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;

      state.isDarkMode
        ? localStorage.setItem('theme', 'dark')
        : localStorage.setItem('theme', 'light');
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

    clickConfirm(state) {
      state.isConfirmed = true;
    },
  },
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
