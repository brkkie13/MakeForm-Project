import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  deleteUser,
  getAuth,
} from 'firebase/auth';
import { auth } from '@/firebase.config';
import { validateEmail, validatePassword } from '@utils/validation';

// redux toolkit
import { Dispatch } from 'redux';
import { authActions } from '@stores/features/authSlice';
import { uiActions } from '@stores/features/uiSlice';

// code
export const register = (
  email: string,
  password: string,
  passwordCheck: string
) => {
  return async (dispatch: Dispatch) => {
    try {
      // 입력값이 정규표현식 조건에 안맞거나 비밀번호 및 확인이 일치하지 않을 때
      const emailValidation = validateEmail(email);
      const passwordValidation = validatePassword(password);
      const passwordMatch = password === passwordCheck;
      if (!emailValidation || !passwordValidation || !passwordMatch) {
        throw new Error('입력한 정보를 다시 한번 확인해주세요.');
      }

      const user = await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== '입력한 정보를 다시 한번 확인해주세요.') {
          error.message = '이미 존재하는 이메일입니다.';
        }
        dispatch(authActions.setErrorMessage(error.message));
      }
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      dispatch(
        authActions.setErrorMessage(
          '이메일 또는 비밀번호를 다시 한번 확인해주세요.'
        )
      );
    }
  };
};

export const logout = () => {
  return async (dispatch: Dispatch) => {
    await signOut(auth);
  };
};

export const resetPassword = (email: string) => {
  return async (dispatch: Dispatch) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);

      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '이메일로 비밀번호 재설정 링크를 보냈습니다',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '다시 한번 시도해주세요',
        })
      );
    }
  };
};

export const deleteAccount = () => {
  return async (dispatch: Dispatch) => {
    const auth = getAuth();
    try {
      if (auth.currentUser !== null) {
        await deleteUser(auth.currentUser);
      } else {
        throw new Error('현재 로그인한 사용자가 없습니다.');
      }
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          message: '다시 한번 시도해주세요',
        })
      );
    }
  };
};
