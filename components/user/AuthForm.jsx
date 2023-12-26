'use client';
import { useEffect, useRef, useState } from 'react';

import { AuthFormStyled } from '@components/user/AuthForm.styles';
import {
  FilledButtonStyled,
  OutlinedButtonStyled,
  ButtonStyled,
} from '@components/ui/Buttons';
import { validateEmail, validatePassword } from '@utils/validation';

import AuthInput from '@components/user/AuthInput';
import { GoogleLogo } from '@components/assets/Icons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '@stores/features/uiSlice';

// firebase auth
import {
  login,
  register,
  loginWithGoogle,
} from '@stores/actions/authActionCreators';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { authActions } from '@stores/features/authSlice';
import ErrorBox from '@components/ui/ErrorBox';

// code
function AuthForm() {
  const dispatch = useDispatch();

  const emailRef = useRef();
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [password, setPassword] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [passwordCheck, setPasswordCheck] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const errorMessage = useSelector(state => state.auth.errorMessage);
  const isLoginMode = useSelector(state => state.ui.isLoginMode);
  const user = useFirebaseAuthState();

  // 바로 타이핑할 수 있도록 input에 포커스
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // 이메일 검증
  useEffect(() => {
    const result = validateEmail(email.value);
    setEmail({ ...email, isValid: result });
  }, [email.value]);

  // 비밀번호 및 비밀번호확인 검증하여 input 아래 에러메세지 표시.
  useEffect(() => {
    const result = validatePassword(password.value);
    setPassword({ ...password, isValid: result });
    const passwordsMatch =
      password.value === passwordCheck.value && password.isValid;
    setPasswordCheck({ ...passwordCheck, isValid: passwordsMatch });
  }, [password.value, passwordCheck.value]);

  // input이 수정되면 에러메세지를 삭제함.
  useEffect(() => {
    dispatch(authActions.clearErrorMessage());
  }, [email.value, password.value, passwordCheck.value, dispatch]);

  useEffect(() => {
    // 로그인이 성공하여 user가 존재하면 모달 닫기.
    user && dispatch(uiActions.closeModal());
  }, [user, dispatch]);

  const submitAuthFormHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
      dispatch(login(email.value, password.value));
    } else {
      dispatch(register(email.value, password.value, passwordCheck.value));
    }
  };

  const googleAuthHandler = () => {
    dispatch(loginWithGoogle());
  };

  const toggleLoginModeHandler = () => {
    dispatch(uiActions.toggleLoginMode());
  };

  return (
    <AuthFormStyled onSubmit={submitAuthFormHandler}>
      <h1>{isLoginMode ? '로그인' : '회원가입'}</h1>

      {errorMessage && <ErrorBox message={errorMessage} />}

      <AuthInput
        type="email"
        placeholder="이메일"
        ref={emailRef}
        onChange={e => setEmail({ ...email, value: e.target.value })}
        onBlur={() => setEmail({ ...email, isTouched: true })}
        userInput={email}
        cautionContent="이메일 형식이 맞는지 확인해주세요."
      />

      <AuthInput
        type="password"
        placeholder="비밀번호"
        onChange={e => setPassword({ ...password, value: e.target.value })}
        onBlur={() => setPassword({ ...password, isTouched: true })}
        userInput={password}
        cautionContent="비밀번호는 영문 소문자, 숫자, 특수문자(!@#$%^&*) 포함 8~24자리로 입력하세요."
      />

      {!isLoginMode && (
        <AuthInput
          type="password"
          placeholder="비밀번호 확인"
          onChange={e =>
            setPasswordCheck({ ...passwordCheck, value: e.target.value })
          }
          onBlur={() => setPasswordCheck({ ...passwordCheck, isTouched: true })}
          userInput={passwordCheck}
          cautionContent="비밀번호를 다시 한번 확인해주세요."
        />
      )}

      <div className="controls">
        <FilledButtonStyled type="submit">
          {isLoginMode ? '로그인' : '회원가입'}
        </FilledButtonStyled>
        <div className="line-group">
          <span className="line"></span>
          <p>또는</p>
          <span className="line"></span>
        </div>
        <OutlinedButtonStyled type="button" onClick={googleAuthHandler}>
          <GoogleLogo />
          {isLoginMode ? '구글 로그인' : '구글 회원가입'}
        </OutlinedButtonStyled>
      </div>

      {isLoginMode ? (
        <p className="toggle-authmode-prompt">
          회원이 아니신가요?
          <ButtonStyled onClick={toggleLoginModeHandler}>회원가입</ButtonStyled>
        </p>
      ) : (
        <p className="toggle-authmode-prompt">
          이미 회원이신가요?
          <ButtonStyled onClick={toggleLoginModeHandler}>로그인</ButtonStyled>
        </p>
      )}
    </AuthFormStyled>
  );
}

export default AuthForm;
