import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setErrorMessage(state, action) {
      const errorMessage = action.payload;
      state.errorMessage = errorMessage;
    },

    clearErrorMessage(state) {
      state.errorMessage = '';
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
