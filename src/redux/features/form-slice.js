import { createSlice, current } from '@reduxjs/toolkit';

let initialState = {
  components: [],
  componentId: 0,
  options: [
    { id: 0, text: '' },
    { id: 1, text: '' },
  ],
  optionId: 2,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,

  reducers: {
    addComponent(state, action) {
      state.components.push({
        id: state.componentId,
        formType: action.payload,
        title: '',
      });
      state.componentId++;
    },

    addOption(state) {
      // '옵션추가' 누를 때마다 객관식 옵션 추가 (optionId: 2)
      state.options.push({
        id: state.optionId,
        text: '',
      }),
        state.optionId++; // optionId 1씩 증가 (optionId: 3)
    },

    removeOption(state, action) {
      const id = action.payload;
      state.options.filter(option => option.id !== id);
    },

    changeTitleValue(state, action) {
      const { index, newValue } = action.payload;
      const components = current(state.components);
      //state.components를 깊은복사하여 배열값을 통째로 덮어씌움 (배열의 특정인덱스만 값을 바꿀 수 없음)
      const copiedComponents = JSON.parse(JSON.stringify(components));
      // copiedComponents[index][fieldName] = newValue;
      copiedComponents[index].title = newValue;
      state.components = copiedComponents;
    },

    changeOptionValue(state, action) {
      const { index, optionId, newValue } = action.payload;
      // option value가 바뀌면 먼저 options를 업데이트.
      state.options.map(option => {
        if (option.id === optionId) {
          option.text = newValue;
        }
      });
      // components 배열도 업데이트
      const components = current(state.components);
      const copiedComponents = JSON.parse(JSON.stringify(components));
      copiedComponents[index].options = state.options;
      state.components = copiedComponents;
    },
  },
});

export default formSlice.reducer;
export const formActions = formSlice.actions;
