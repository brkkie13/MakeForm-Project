import { createSlice } from '@reduxjs/toolkit';

let initialState = {};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {},
});

export default uiSlice.reducer;
export const uiActions = uiSlice.actions;
