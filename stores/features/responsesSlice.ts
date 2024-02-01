import { createSlice } from '@reduxjs/toolkit';
import {
  ResponseItemWithTitle,
  ResponseItemWithDescription,
  ResponsesListItem,
  SavedResponse,
  Response,
} from '@/types/types';

export interface ResponsesInitialState {
  responses: (ResponseItemWithTitle | ResponseItemWithDescription)[];
  // responsesList: ResponsesListItem[];
  responsesList: Response[];
}

let initialState: ResponsesInitialState = {
  responses: [],
  responsesList: [],
};

export const responsesSlice = createSlice({
  name: 'response',
  initialState,

  reducers: {
    setInitialValue(state, action) {
      const items = action.payload || [];

      const processedItems = items.map(
        (item: ResponseItemWithTitle | ResponseItemWithDescription) => {
          // const { formType, title, description } = item;
          const { formType } = item;

          // let newItem = { formType };
          let newItem: {
            formType: string;
            title?: string;
            description?: string;
          } = { formType };

          // title && (newItem.title = title);
          // description && (newItem.description = description);
          if ('title' in item) newItem.title = item.title;
          if ('description' in item) newItem.description = item.description;

          return newItem;
        }
      );

      state.responses = processedItems;
    },

    changeInputValue(state, action) {
      const { itemIdx, newValue } = action.payload;
      const item = state.responses[itemIdx] as ResponseItemWithTitle;

      if (item.title && item.response) {
        item.response = newValue;
        // state.responses[itemIdx].response = newValue;
      }
    },

    changeRatingValue(state, action) {
      const { itemIdx, score } = action.payload;
      const item = state.responses[itemIdx] as ResponseItemWithTitle;

      if (item.title && item.response) {
        item.response = score;
      }
      // if (state.responses.length > 0) {
      //   state.responses[itemIdx].response = score;
      // }
    },

    changeOptionValue(state, action) {
      const { itemIdx, optionIdx, optionText } = action.payload;
      const processedResponse = `${optionIdx + 1}. ${optionText}`;
      const item = state.responses[itemIdx] as ResponseItemWithTitle;

      // 선택한 객관식의 인덱스번호를 찾아서 옵션번호와 옵션텍스트 저장
      if (item.title && item.response) {
        item.response = processedResponse;
      }
      // state.responses[itemIdx].response = processedResponse;
    },

    replaceResponsesList(state, action) {
      const formResponsesData = action.payload;

      // const processedData = formResponsesData.flatMap(item =>
      const processedData = formResponsesData.map((item: SavedResponse) =>
        item.responsesList.map(el => ({
          formId: item.formId,
          header: item.header,
          responses: el.responses,
          submissionDate: el.submissionDate,
          id: el.id,
        }))
      );

      // 내림차순(최신순)으로 정렬
      const compareDates = (a: ResponsesListItem, b: ResponsesListItem) => {
        return (
          new Date(b.submissionDate).getTime() -
          new Date(a.submissionDate).getTime()
        );
      };

      processedData.sort(compareDates);
      state.responsesList = processedData;
    },
  },
});

export default responsesSlice.reducer;
export const responsesActions = responsesSlice.actions;
