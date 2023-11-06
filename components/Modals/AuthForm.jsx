'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';

// css
import { AuthFormStyled } from './AuthForm.styles';
import { Button } from '../ui/Button.styles';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

// code

function AuthForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoginMode = useSelector(state => state.ui.isLoginMode);
  const emailRef = useRef();
  const passwordRef = useRef();

  const createUser = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/signup', { email, password });

      if (res.data.error) {
        console.log('회원가입에러');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '회원가입 성공',
        })
      );
      // 회원가입 후 창 닫기
      dispatch(uiActions.toggleModal());
    } catch (error) {
      console.log('회원가입에러');
    }

    setTimeout(() => {
      dispatch(uiActions.clearNotification());
    }, 3000);
  };

  const submitHandler = async event => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    // 회원가입일 때
    if (!isLoginMode) {
      const result = await createUser(enteredEmail, enteredPassword);
    }
  };

  const switchAuthModeHandler = () => {
    dispatch(uiActions.toggleLoginMode());
    emailRef.current.value = '';
    passwordRef.current.value = '';
  };

  return (
    <AuthFormStyled onSubmit={submitHandler}>
      <h1>{isLoginMode ? '로그인' : '회원가입'}</h1>
      <input type="email" placeholder="이메일" ref={emailRef} />
      <input type="password" placeholder="비밀번호" ref={passwordRef} />
      <Button type="submit" primary="highlight">
        {isLoginMode ? '로그인' : '회원가입'}
      </Button>
      {isLoginMode && <span className="underline">비밀번호를 잊으셨나요?</span>}
      <div onClick={switchAuthModeHandler}>
        <span>{isLoginMode ? '회원이 아니신가요?' : '이미 회원이신가요?'}</span>
        <span className="underline">
          {isLoginMode ? '회원가입' : '로그인하러 가기'}
        </span>
      </div>
    </AuthFormStyled>
  );
}

export default AuthForm;
