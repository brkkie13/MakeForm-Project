import React, { forwardRef } from 'react';
import { AuthInputStyled } from '@components/user/AuthInput.styles';
import { CorrectMark, WrongMark, InfoIcon } from '@/public/svgs/Icons';
import { UserInput } from '@/types/types';

// types
type Props = {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  userInput: UserInput;
  cautionContent: string;
};

// code
// 아이디, 비밀번호 input
const AuthInput = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  const { type, placeholder, onChange, onBlur, userInput, cautionContent } =
    props;

  return (
    <AuthInputStyled>
      <div className="input-container">
        <input
          className={!userInput.isValid && userInput.isTouched ? 'invalid' : ''}
          autoComplete="off"
          ref={ref}
          required
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
        <div className="validation-icon">
          <CorrectMark className={userInput.isValid ? 'valid' : 'hide'} />
          <WrongMark
            className={
              !userInput.isValid && userInput.isTouched ? 'invalid' : 'hide'
            }
          />
        </div>
      </div>

      <p
        className={
          !userInput.isValid && userInput.isTouched ? 'caution' : 'hide'
        }
      >
        <InfoIcon />
        {cautionContent}
      </p>
    </AuthInputStyled>
  );
});

AuthInput.displayName = 'AuthInput';
export default AuthInput;
