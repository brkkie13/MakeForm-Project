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
    replaceFormList(state, action) {
      const formData = action.payload;
      state.formList = formData;
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
