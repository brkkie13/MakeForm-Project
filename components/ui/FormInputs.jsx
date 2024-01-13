'use client';

import {
  FormInputStyled,
  HeaderInputStyled,
  TitleInputStyled,
  ResponseInputStyled,
} from '@components/ui/FormInputs.styles';

// textarea에 입력된 글 길이에 따라 높이가 자동 조절되는 함수.
const resizeHeightHandler = event => {
  const target = event.target;
  const DEFAULT_HEIGHT = 18; // 기본높이는 폰트사이즈와 같다.
  target.style.height = 0;
  target.style.height = DEFAULT_HEIGHT + (target.scrollHeight - 20) + 'px'; // scrollHeight에 -20을 한 이유는 글자입력 시 textarea안 하단여백을 없애기 위함.
};

// 기본 textarea
export function FormInput(props) {
  return <FormInputStyled {...props} onInput={resizeHeightHandler} />;
}

// 폼 제목(header) textarea
export function FormHeaderInput(props) {
  return <HeaderInputStyled {...props} onInput={resizeHeightHandler} />;
}

// 질문 제목(title) textarea
export function FormTitleInput(props) {
  return <TitleInputStyled {...props} onInput={resizeHeightHandler} />;
}

// 주관식 응답 textarea
export function ResponseInput(props) {
  return <ResponseInputStyled {...props} onInput={resizeHeightHandler} />;
}
