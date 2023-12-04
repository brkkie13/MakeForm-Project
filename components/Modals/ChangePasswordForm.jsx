import { useRef, useState, useEffect } from 'react';
import { AuthInput } from '../ui/InputArea';
import { Button } from '../ui/Button.styles';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

function ChangePasswordForm() {
  const auth = getAuth();
  const emailRef = useRef();
  const [email, setEmail] = useState({
    value: '',
    isValid: false,
    isTouched: false,
  });

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const resetPasswordHandler = () => {
    sendPasswordResetEmail(auth, email.value);
  };

  return (
    <div>
      <h1>비밀번호 재설정</h1>
      <AuthInput
        type="email"
        placeholder="이메일"
        ref={emailRef}
        onChange={e => setEmail({ ...email, value: e.target.value })}
        onBlur={() => setEmail({ ...email, isTouched: true })}
        userInput={email}
        cautionContent="이메일 형식이 맞는지 확인해주세요."
      />
      <Button onClick={resetPasswordHandler}>확인</Button>
    </div>
  );
}

export default ChangePasswordForm;
