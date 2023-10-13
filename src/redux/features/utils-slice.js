import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  formattedDate: '',
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },

    changeDateFormat(state, action) {
      const creationDate = action.payload;
      const year = new Date(creationDate).getFullYear();
      const month = new Date(creationDate).getMonth();
      const date = new Date(creationDate).getDate();
      state.formattedDate = `${year}년 ${month + 1}월 ${date}일`;
    },
  },
});

export default utilsSlice.reducer;
export const utilsActions = utilsSlice.actions;
