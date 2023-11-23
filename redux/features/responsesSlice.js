import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  responses: [],
};

export const responsesSlice = createSlice({
  name: 'response',
  initialState,

  reducers: {
    setInitialValue(state, action) {
      const items = action.payload;
      state.responses = items;
    },

    changeInputValue(state, action) {
      const { itemIdx, newValue } = action.payload;
      state.responses[itemIdx].response = newValue;
    },

    changeRatingValue(state, action) {
      const { itemIdx, score } = action.payload;
      state.responses[itemIdx].response = score;
    },

    changeOptionValue(state, action) {
      const { itemIdx, optionIdx } = action.payload;
      // 선택한 객관식 옵션의 인덱스번호를 저장.
      state.responses[itemIdx].response = optionIdx;
    },
  },
});

export default responsesSlice.reducer;
export const responsesActions = responsesSlice.actions;
