import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  // '/create'
  components: [],
  componentId: 0,
  optionId: 2, // 옵션2개는 필수값이기 때문에 이미 id가 0,1인 옵션 존재. 2부터 시작
  header: '',

  formList: [], // db에 저장된 전체 폼 데이터를 배열로 저장한 변수.

  // '/edit'
  targetedForm: {}, // edit페이지에서 수정하려고 하는 특정 폼 객체.
  editHeader: '', // edit페이지에서 수정할 header값
  editItems: [], // [{formType, id, title, options}, {}, {}, ...]
};

export const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    addComponent(state, action) {
      const formType = action.payload;
      if (formType === 'multipleChoiceTextType') {
        state.components.push({
          id: state.componentId,
          formType,
          title: '',
          options: [
            { id: 0, text: '' },
            { id: 1, text: '' },
          ],
        });
      } else if (formType === 'descriptionType') {
        state.components.push({
          id: state.componentId,
          formType,
          description: '',
        });
      } else {
        state.components.push({
          id: state.componentId,
          formType,
          title: '',
        });
      }
      state.componentId++;
    },

    addOption(state, action) {
      const { index, editItemIndex, lastOptionId, isEdit } = action.payload;

      const options = isEdit
        ? state.editItems[editItemIndex].options
        : state.components[index].options;

      options.push(
        isEdit
          ? { id: lastOptionId, text: '' }
          : { id: state.optionId, text: '' }
      );

      !isEdit && state.optionId++;
    },

    removeOption(state, action) {
      const { index, editItemIndex, optionId, isEdit } = action.payload;

      const options = isEdit
        ? state.editItems[editItemIndex].options
        : state.components[index].options;

      const filteredOptions = options.filter(option => option.id !== optionId);

      isEdit
        ? (state.editItems[editItemIndex].options = filteredOptions)
        : (state.components[index].options = filteredOptions);
    },

    changeTitle(state, action) {
      const { index, editItemIndex, newValue, isEdit } = action.payload;
      isEdit
        ? (state.editItems[editItemIndex].title = newValue)
        : (state.components[index].title = newValue);
    },

    changeOption(state, action) {
      const { index, editItemIndex, optionId, newValue, isEdit } =
        action.payload;

      const options = isEdit
        ? state.editItems[editItemIndex].options
        : state.components[index].options;

      options.forEach(option => {
        option.id === optionId && (option.text = newValue);
      });
    },

    changeHeader(state, action) {
      const { newValue, isEdit } = action.payload;
      isEdit ? (state.editHeader = newValue) : (state.header = newValue);
    },

    changeDescription(state, action) {
      const { index, editItemIndex, newValue, isEdit } = action.payload;
      isEdit
        ? (state.editItems[editItemIndex].description = newValue)
        : (state.components[index].description = newValue);
    },

    // '/create'페이지에서 저장버튼 누르면 입력했던 모든 내용이 초기화됨.
    resetAllValue(state) {
      state.components = [];
      state.componentId = 0;
      state.optionId = 2;
      state.header = '';
    },

    // db에 저장된 formList를 받아와 배열로 변수에 저장.
    replaceFormList(state, action) {
      // fetchFormData함수에서 db의 데이터 받아옴.
      const formData = action.payload;

      // 내림차순(최신순)으로 정렬
      const compareDates = (a, b) => {
        return new Date(b.creationDate) - new Date(a.creationDate);
      };
      formData.sort(compareDates);

      state.formList = formData;
    },

    // edit페이지에서 어떤 form을 수정할건지 formList에서 찾기.
    findTargetedForm(state, action) {
      const targetedFormId = action.payload;
      const targetedForm = state.formList.find(
        form => form.id === targetedFormId
      );
      state.targetedForm = targetedForm;
    },

    // '/edit'페이지일 때 수정해야 할 값을 세팅
    setInitialEditValue(state) {
      state.editHeader = state.targetedForm?.header;
      state.editItems = state.targetedForm?.items;
    },
  },
});

export default formSlice.reducer;
export const formActions = formSlice.actions;
