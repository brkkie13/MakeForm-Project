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

  // 에러 해결: (If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode.)
  // serializableCheck를 사용하지 않도록 middleware를 설정
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
