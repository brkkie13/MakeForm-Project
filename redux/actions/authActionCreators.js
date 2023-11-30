import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase.config';
import { authActions } from '../features/authSlice';
import { validateEmail, validatePassword } from '../../utils/validation';

export const register = (email, password, passwordCheck) => {
  return async dispatch => {
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
      if (error.message !== '입력한 정보를 다시 한번 확인해주세요.') {
        error.message = '이미 존재하는 이메일입니다.';
      }
      dispatch(authActions.setErrorMessage(error.message));
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
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
  return async dispatch => {
    await signOut(auth);
  };
};

export const loginWithGoogle = () => {
  return async dispatch => {
    const googleProvider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // const name = result.user.displayName;
      // const email = result.user.email;
      // const profilePhoto = result.user.photoURL;

      // localStorage.setItem('googleName', name);
      // localStorage.setItem('googleEmail', email);
      // localStorage.setItem('googleProfile', profilePhoto);
    } catch (error) {
      console.log(error);
    }
  };
};
