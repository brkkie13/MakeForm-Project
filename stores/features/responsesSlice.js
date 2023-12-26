import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  responses: [],
};

export const responsesSlice = createSlice({
  name: 'response',
  initialState,

  reducers: {
    setInitialValue(state, action) {
      const items = action.payload || [];

      const processedItems = items.map(item => {
        const { formType, title, description } = item;

        let newItem = { formType };
        title && (newItem.title = title);
        description && (newItem.description = description);

        return newItem;
      });

      state.responses = processedItems;
    },

    changeInputValue(state, action) {
      const { itemIdx, newValue } = action.payload;
      state.responses[itemIdx].response = newValue;
    },

    changeRatingValue(state, action) {
      const { itemIdx, score } = action.payload;

      if (state.responses.length > 0) {
        state.responses[itemIdx].response = score;
      }
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