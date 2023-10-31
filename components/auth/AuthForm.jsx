import Link from 'next/link';

// css
import { UserInputForm } from './AuthForm.styles';
import { Button } from '../ui/Button.styles';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from '../../redux/features/uiSlice';

// code
function AuthForm() {
  const dispatch = useDispatch();
  const isLoginMode = useSelector(state => state.ui.isLoginMode);

  const submitFormHandler = event => {
    event.preventDefault();
  };

  const showRegisterModeHandler = () => {
    dispatch(uiActions.toggleLoginMode());
  };

  return (
    <>
      <UserInputForm onSubmit={submitFormHandler}>
        <h1>{isLoginMode ? '로그인' : '회원가입'}</h1>
        <input type="email" placeholder="이메일" />
        <input type="password" placeholder="비밀번호" />
        {!isLoginMode && <input type="text" placeholder="닉네임" />}
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
