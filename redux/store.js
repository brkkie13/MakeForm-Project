import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/uiSlice';
import formReducer from './features/formSlice';
import utilsReducer from './features/utilsSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    form: formReducer,
    utils: utilsReducer,
  },
});

export default store;
