import { createSlice } from '@reduxjs/toolkit';

let initialState = {};

export const myFormSlice = createSlice({
  name: 'my-form',
  initialState,
  reducers: {},
});

export default myFormSlice.reducer;
export const myFormActions = myFormSlice.actions;
