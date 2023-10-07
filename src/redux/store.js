import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './features/ui-slice';
import formReducer from './features/form-slice';
import myFormReducer from './features/my-form-slice';
import utilsReducer from './features/utils-slice';

const store = configureStore({
  reducer: {
    ui: uiReducer,
    form: formReducer,
    myForm: myFormReducer,
    utils: utilsReducer,
  },
});

// <컴포넌트 안에서 dispatch 함수를 부를 때>
// import { cartActions } from '~~/cart-slice'
// 함수 안에서 사용
// dispatch(cartActions.getAllProducts({data})); //매개변수로 전달된 값은 알아서 payload 필드 아래로 들어감.

export default store;
