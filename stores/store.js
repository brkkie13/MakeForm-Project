import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '@stores/features/uiSlice';
import formReducer from '@stores/features/formSlice';
import responsesReducer from '@stores/features/responsesSlice';
import utilsReducer from '@stores/features/utilsSlice';
import authReducer from '@stores/features/authSlice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    form: formReducer,
    responses: responsesReducer,
    utils: utilsReducer,
    auth: authReducer,
  },

  // 에러 해결: (If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode.)
  // serializableCheck를 사용하지 않도록 middleware를 설정
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
