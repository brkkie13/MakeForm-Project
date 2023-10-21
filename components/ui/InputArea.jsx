'use client';

import { Textarea, HeaderTextarea, TitleTextarea } from './InputArea.styles';

// textarea에 입력된 글 길이에 따라 높이가 자동 조절되는 함수.
const resizeHeightHandler = event => {
  const target = event.target;
  const DEFAULT_HEIGHT = 18; // 기본높이는 폰트사이즈와 같다.
  target.style.height = 0;
  target.style.height = DEFAULT_HEIGHT + (target.scrollHeight - 20) + 'px';
  // scrollHeight에 -20을 한 이유는 글자입력 시 textarea안 하단여백을 없애기 위함.
};

// 본문용 textarea (글자크기 소)
export function InputArea(props) {
  return <Textarea {...props} onInput={resizeHeightHandler}></Textarea>;
}

// 주제용 textarea (글자크기 대)
export function HeaderInputArea(props) {
  return (
    <HeaderTextarea {...props} onInput={resizeHeightHandler}></HeaderTextarea>
  );
}

// 타이틀용 textarea (글자크기 중)
export function TitleInputArea(props) {
  return (
    <TitleTextarea {...props} onInput={resizeHeightHandler}></TitleTextarea>
  );
}
