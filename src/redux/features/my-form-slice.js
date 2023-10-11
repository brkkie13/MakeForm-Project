import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  formList: [],
  isEdit: false,
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

    resetFormList(state) {
      state.formList = [];
    },

    toggleEditMode(state) {
      state.isEdit = !state.isEdit;
    },
  },
});

export default myFormSlice.reducer;
export const myFormActions = myFormSlice.actions;
