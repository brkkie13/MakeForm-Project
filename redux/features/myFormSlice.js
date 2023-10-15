import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  formList: [], // db에 저장된 전체 폼 데이터를 배열로 저장한 변수.
  targetedForm: {}, // edit페이지에서 수정하려고 하는 특정 폼 객체.
  editHeader: '',
  editItems: [], // [{formType, id, title, options}, {}, {}, ...]
};

export const myFormSlice = createSlice({
  name: 'my-form',
  initialState,
  reducers: {
    // db에 저장된 폼 데이터들의 형식을 가공해 변수에 저장.
    replaceFormList(state, action) {
      state.formList = []; // 페이지가 렌더링될 때마다 계속 push되어 배열 요소가 늘어나므로, 함수 실행하자마자 빈배열로 초기화 후 push 진행.
      const formData = action.payload;
      for (const key in formData) {
        state.formList.push({
          id: key,
          ...formData[key],
        });
      }
    },

    // edit페이지에서 어떤 폼을 수정할건지 formList에서 찾기.
    findTargetedForm(state, action) {
      const targetedFormId = action.payload;
      const targetedForm = state.formList.find(
        form => form.id === targetedFormId
      );
      state.targetedForm = targetedForm;
    },

    setInitialEditValue(state) {
      state.editHeader = state.targetedForm?.header;
      state.editItems = state.targetedForm?.items;
    },

    // edit페이지의 HeaderType에서 header값 수정
    changeHeader(state, action) {
      const newValue = action.payload;
      state.editHeader = newValue;
    },

    changeTitle(state, action) {
      const { itemIndex, newValue } = action.payload;
      state.editItems[itemIndex].title = newValue;
    },

    changeOption(state, action) {
      const { itemIndex, optionId, newValue } = action.payload;
      const options = state.editItems[itemIndex].options;
      const newOptions = options.map(option =>
        option.id === optionId ? { ...option, text: newValue } : option
      );
      state.editItems[itemIndex].options = newOptions;
    },

    addOption(state, action) {
      const { itemIndex, lastOptionId } = action.payload;
      const options = state.editItems[itemIndex].options;
      options.push({ id: lastOptionId, text: '' });
    },

    removeOption(state, action) {
      const { itemIndex, clickedOptionId } = action.payload;
      const options = state.editItems[itemIndex].options;
      const filteredOptions = options.filter(
        option => option.id !== clickedOptionId
      );
      state.editItems[itemIndex].options = filteredOptions;
    },
  },
});

export default myFormSlice.reducer;
export const myFormActions = myFormSlice.actions;
