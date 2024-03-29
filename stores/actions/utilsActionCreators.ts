import { Dispatch } from 'redux';
import { uiActions } from '@stores/features/uiSlice';

// code
export const copyToClipboard = (text: string, message: string) => {
  return async (dispatch: Dispatch) => {
    try {
      await navigator.clipboard.writeText(text);
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: message,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '다시 한번 시도해주세요',
        })
      );
    }
  };
};
