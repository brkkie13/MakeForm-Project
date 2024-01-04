import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  responses: [],
  responsesList: [],
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
      const { itemIdx, optionIdx, optionText } = action.payload;
      const processedResponse = `${optionIdx + 1}. ${optionText}`;
      // 선택한 객관식의 인덱스번호를 찾아서 옵션번호와 옵션텍스트 저장
      state.responses[itemIdx].response = processedResponse;
    },

    replaceResponsesList(state, action) {
      const formResponsesData = action.payload;

      const processedData = formResponsesData.flatMap(item =>
        item.responsesList.map(response => ({
          formId: item.formId,
          header: item.header,
          responses: response.responses,
          submissionDate: new Date(response.submissionDate).getTime(),
        }))
      );

      // 내림차순(최신순)으로 정렬
      const compareDates = (a, b) => {
        return new Date(b.submissionDate) - new Date(a.submissionDate);
      };

      processedData.sort(compareDates);
      state.responsesList = processedData;
    },
  },
});

export default responsesSlice.reducer;
export const responsesActions = responsesSlice.actions;
