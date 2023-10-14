import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  formList: [],
};

export const myFormSlice = createSlice({
  name: 'my-form',
  initialState,
  reducers: {
    replaceFormList(state, action) {
      // 페이지가 렌더링될 때마다 계속 push되어 배열 요소가 늘어나므로, 함수 실행하자마자 배열 초기화 후 push.
      state.formList = [];
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
