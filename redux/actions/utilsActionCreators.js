import { uiActions } from '../features/uiSlice';

export const copyToClipboard = text => {
  return async dispatch => {
    try {
      await navigator.clipboard.writeText(text);
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '이메일이 복사되었습니다',
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

    // try {
    //   await sendPasswordResetEmail(auth, email);

    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'success',
    //       message: '이메일로 비밀번호 재설정 링크를 보냈습니다',
    //     })
    //   );
    // } catch (error) {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       message: '다시 한번 시도해주세요',
    //     })
    //   );
    // }
  };
};
