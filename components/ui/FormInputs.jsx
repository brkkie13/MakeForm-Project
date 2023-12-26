'use client';

import {
  FormInputStyled,
  HeaderFormInputStyled,
  TitleFormInputStyled,
} from '@components/ui/FormInputs.styles';

// textarea에 입력된 글 길이에 따라 높이가 자동 조절되는 함수.
const resizeHeightHandler = event => {
  const target = event.target;
  const DEFAULT_HEIGHT = 18; // 기본높이는 폰트사이즈와 같다.
  target.style.height = 0;
  target.style.height = DEFAULT_HEIGHT + (target.scrollHeight - 20) + 'px'; // scrollHeight에 -20을 한 이유는 글자입력 시 textarea안 하단여백을 없애기 위함.
};

export function FormInput(props) {
  return (
    <FormInputStyled {...props} onInput={resizeHeightHandler}></FormInputStyled>
  );
}

export function FormHeaderInput(props) {
  return (
    <HeaderFormInputStyled
      {...props}
      onInput={resizeHeightHandler}
    ></HeaderFormInputStyled>
  );
}

export function FormTitleInput(props) {
  return (
    <TitleFormInputStyled
      {...props}
      onInput={resizeHeightHandler}
    ></TitleFormInputStyled>
  );
}
