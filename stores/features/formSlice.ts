import { CreatedData, Item, Option } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

export interface FormInitialState {
  components: Item[];
  componentId: number;
  optionId: number;
  header: string;
  formList: CreatedData[];
  editHeader: string;
  editItems: Item[];
}

let initialState: FormInitialState = {
  // '/create'
  components: [],
  componentId: 0,
  optionId: 2, // 옵션2개는 필수값이기 때문에 이미 id가 0,1인 옵션 존재. 2부터 시작
  header: '',

  formList: [], // db에 저장된 전체 폼 데이터를 배열로 저장한 변수.

  // '/edit'
  editHeader: '', // edit페이지에서 수정할 header값
  editItems: [], // [{formType, id, title, options}, {}, {}, ...]
};

export const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    addComponent(state, action) {
      const formType = action.payload;
      if (formType === 'objectiveType') {
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

    removeComponent(state, action) {
      const index = action.payload;
      state.components.splice(index, 1);
    },

    reorderComponents(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedComponent] = state.components.splice(sourceIndex, 1);
      state.components.splice(destinationIndex, 0, removedComponent);
    },

    addOption(state, action) {
      const { index, lastOptionId, isEdit } = action.payload;

      const options = isEdit
        ? state.editItems[index].options || []
        : state.components[index].options || [];

      options.push(
        isEdit
          ? { id: lastOptionId, text: '' }
          : { id: state.optionId, text: '' }
      );

      !isEdit && state.optionId++;
    },

    removeOption(state, action) {
      const { index, optionId, isEdit } = action.payload;

      const options = isEdit
        ? state.editItems[index].options || []
        : state.components[index].options || [];

      const filteredOptions = options.filter(option => option.id !== optionId);

      isEdit
        ? (state.editItems[index].options = filteredOptions)
        : (state.components[index].options = filteredOptions);
    },

    changeTitle(state, action) {
      const { index, newValue, isEdit } = action.payload;
      isEdit
        ? (state.editItems[index].title = newValue)
        : (state.components[index].title = newValue);
    },

    changeOption(state, action) {
      const { index, optionId, newValue, isEdit } = action.payload;

      // options 필드가 선택적프로퍼티라서 undefined일 경우 빈배열 반환
      const options: Option[] = isEdit
        ? state.editItems[index].options || []
        : state.components[index].options || [];

      options.forEach(option => {
        option.id === optionId && (option.text = newValue);
      });
    },

    changeHeader(state, action) {
      const { newValue, isEdit } = action.payload;
      isEdit ? (state.editHeader = newValue) : (state.header = newValue);
    },

    changeDescription(state, action) {
      const { index, newValue, isEdit } = action.payload;
      isEdit
        ? (state.editItems[index].description = newValue)
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
      const compareDates = (a: CreatedData, b: CreatedData) => {
        return (
          new Date(b.creationDate).getTime() -
          new Date(a.creationDate).getTime()
        );
      };

      formData && formData.sort(compareDates);
      state.formList = formData;
    },

    // '/edit'페이지일 때 수정해야 할 값을 세팅
    setInitialEditValue(state, action) {
      const targetedForm = action.payload;
      state.editHeader = targetedForm.header;
      state.editItems = targetedForm?.items;
    },

    addEditItem(state, action) {
      const formType = action.payload;
      // editItems에 존재하는 id 중 가장 큰 숫자를 가진 id를 구함.
      let editItemId = state.editItems.reduce(
        (maxId, item) => (item.id > maxId ? item.id : maxId),
        0
      );
      editItemId++; // +1해서 추가하는 form type의 id로 할당.

      if (formType === 'objectiveType') {
        state.editItems.push({
          id: editItemId,
          formType,
          title: '',
          options: [
            { id: 0, text: '' },
            { id: 1, text: '' },
          ],
        });
      } else if (formType === 'descriptionType') {
        state.editItems.push({
          id: editItemId,
          formType,
          description: '',
        });
      } else {
        state.editItems.push({
          id: editItemId,
          formType,
          title: '',
        });
      }
    },

    removeEditItem(state, action) {
      const index = action.payload;
      state.editItems.splice(index, 1);
    },

    reorderEditItems(state, action) {
      const { sourceIndex, destinationIndex } = action.payload;
      const [removedEditItem] = state.editItems.splice(sourceIndex, 1);
      state.editItems.splice(destinationIndex, 0, removedEditItem);
    },
  },
});

export default formSlice.reducer;
export const formActions = formSlice.actions;
