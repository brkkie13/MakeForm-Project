'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

// css
import { UserInputForm } from './AuthForm.styles';
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

  const showRegisterModeHandler = () => {
    dispatch(uiActions.toggleLoginMode());
  };

  return (
    <>
      <UserInputForm onSubmit={submitHandler}>
        <h1>{isLoginMode ? '로그인' : '회원가입'}</h1>
        <input type="email" placeholder="이메일" ref={emailRef} />
        <input type="password" placeholder="비밀번호" ref={passwordRef} />
        <Button type="submit">{isLoginMode ? '로그인' : '회원가입'}</Button>
        {isLoginMode && <Link href="/">비밀번호를 잊으셨나요?</Link>}
        <Button
          type="button"
          primary="highlight"
          onClick={showRegisterModeHandler}
        >
          {isLoginMode ? '회원가입' : '로그인하러 가기'}
        </Button>
      </UserInputForm>
    </>
  );
}

export default AuthForm;
