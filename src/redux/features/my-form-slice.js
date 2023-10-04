import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  formList: [],
};

export const myFormSlice = createSlice({
  name: 'my-form',
  initialState,
  reducers: {
    replaceFormList(state, action) {
      const formData = action.payload;
      for (const key in formData) {
        state.formList.push({
          id: key,
          ...formData[key],
        });
      }
    },
  },
});

export default myFormSlice.reducer;
export const myFormActions = myFormSlice.actions;
