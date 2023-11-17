'use client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { AuthFormStyled } from './AuthForm.styles';
import { Button } from '../ui/Button.styles';
import { validateEmail, validatePassword } from '../../utils/validation';

// redux
import { AuthInput } from '../ui/InputArea';
import { CautionIcon } from '../../\bstyles/Icons';

// code
function AuthForm() {
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

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // 바로 타이핑할 수 있도록 input에 포커스
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // 이메일 검증
  useEffect(() => {
    const result = validateEmail(email.value);
    setEmail({ ...email, isValid: result });
  }, [email.value]);

  // 비밀번호 및 비밀번호확인 검증
  useEffect(() => {
    const result = validatePassword(password.value);
    setPassword({ ...password, isValid: result });
    const passwordsMatch =
      password.value === passwordCheck.value && password.isValid;
    setPasswordCheck({ ...passwordCheck, isValid: passwordsMatch });
  }, [password.value, passwordCheck.value]);

  useEffect(() => {
    setErrorMessage('');
  }, [email.value, password.value, passwordCheck.value]);

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await axios.post('/api/auth', {
      email: email.value,
      password: password.value,
    });

    if (response.data.error) {
      setErrorMessage(response.data.error);
      return;
    }

    setSuccess(true);
  };

  if (success) {
    return (
      <AuthFormStyled>
        <h1>회원가입 완료</h1>
        <p>
          <Link href={'#'}>로그인</Link>
        </p>
      </AuthFormStyled>
    );
  }

  return (
    <AuthFormStyled onSubmit={handleSubmit}>
      <h1>회원가입</h1>

      <div className={errorMessage ? 'error-message' : 'hide'}>
        <CautionIcon />
        <p>{errorMessage}</p>
      </div>

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
        cautionContent="비밀번호는 영문 소문자, 숫자, 특수문자(!@#$%^&*) 포함 8~24자리로 설정하세요."
      />

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

      <Button type="submit" primary="highlight">
        회원가입
      </Button>
    </AuthFormStyled>
  );
}

export default AuthForm;
