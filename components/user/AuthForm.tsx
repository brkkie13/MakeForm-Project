'use client';
import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { AuthFormStyled } from '@components/user/AuthForm.styles';
import { FilledButtonStyled, ButtonStyled } from '@components/ui/Buttons';
import AuthInput from '@components/user/AuthInput';
import { validateEmail, validatePassword } from '@utils/validation';
import { replaceFirstSegmentOfPath } from '@utils/replacePath';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import { uiActions } from '@stores/features/uiSlice';

// firebase auth
import { login, register } from '@stores/actions/authActionCreators';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { authActions } from '@stores/features/authSlice';
import ErrorBox from '@components/ui/ErrorBox';

// types
import { AuthState, UiState, UserInput } from '@/types/types';

// code
function AuthForm() {
  const router = useRouter();
  const pathname = usePathname();
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState<UserInput>({
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [password, setPassword] = useState<UserInput>({
    value: '',
    isValid: false,
    isTouched: false,
  });
  const [passwordCheck, setPasswordCheck] = useState<UserInput>({
    value: '',
    isValid: false,
    isTouched: false,
  });

  const errorMessage = useSelector(
    (state: AuthState) => state.auth.errorMessage
  );
  const isLoginMode = useSelector((state: UiState) => state.ui.isLoginMode);
  const user = useFirebaseAuthState();

  // 바로 타이핑할 수 있도록 input에 포커스
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
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
    if (user) {
      // 로그인이 성공하여 user가 존재하면 모달 닫기
      dispatch(uiActions.closeModal());

      // '/forms/[formId]'페이지일 때 '/forms'페이지로 이동
      replaceFirstSegmentOfPath(pathname);
    }
  }, [user, dispatch]);

  const submitAuthFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isLoginMode) {
      dispatch(login(email.value, password.value));
    } else {
      dispatch(register(email.value, password.value, passwordCheck.value));
    }
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

        <div className="toggle-authmode-prompt">
          <p>{isLoginMode ? '회원이 아니신가요?' : '이미 회원이신가요?'}</p>
          <ButtonStyled onClick={toggleLoginModeHandler}>
            {isLoginMode ? '회원가입' : '로그인'}
          </ButtonStyled>
        </div>
      </div>
    </AuthFormStyled>
  );
}

export default AuthForm;
