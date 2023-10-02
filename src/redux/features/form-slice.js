import { createSlice, current } from '@reduxjs/toolkit';

let initialState = {
  components: [],
  componentId: 0,
  optionId: 2,
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
      } else {
        state.components.push({
          id: state.componentId,
          formType,
          title: '',
        });
      }
      state.componentId++;
    },

    resetComponents(state) {
      state.components = [];
    },

    addOption(state, action) {
      const index = action.payload;
      const options = state.components[index].options;
      // '옵션추가' 누를 때마다 객관식 옵션 추가 (optionId: 2)
      options.push({
        id: state.optionId,
        text: '',
      }),
        state.optionId++; // optionId 1씩 증가 (optionId: 3)
    },

    removeOption(state, action) {
      const { index, id } = action.payload;
      const options = state.components[index].options;
      const filteredOptions = options.filter(option => option.id !== id);
      state.components[index].options = filteredOptions;
    },

    changeTitleValue(state, action) {
      const { index, newValue } = action.payload;
      state.components[index].title = newValue;
    },

    changeOptionValue(state, action) {
      const { index, optionId, newValue } = action.payload;
      const options = state.components[index].options;
      // option value가 바뀌면 먼저 options를 업데이트.
      options.forEach(option => {
        if (option.id === optionId) {
          option.text = newValue;
        }
      });
    },
  },
});

export default formSlice.reducer;
export const formActions = formSlice.actions;
