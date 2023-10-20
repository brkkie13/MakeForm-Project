'use client';
import styled from 'styled-components';

const Textarea = styled.textarea`
  /* background-color: #f1fbff; */
  width: 100%;
  font-size: 18px;
  resize: none;
  line-height: 1.5;
`;

function TitleInput(props) {
  const resizeHeightHandler = event => {
    const target = event.target;
    const DEFAULT_HEIGHT = 18; // 기본높이는 폰트사이즈와 같다.
    target.style.height = 0;
    target.style.height = DEFAULT_HEIGHT + target.scrollHeight + 'px';
  };

  return (
    <Textarea
      {...props}
      onInput={resizeHeightHandler}
      placeholder="질문 제목"
    ></Textarea>
  );
}

export default TitleInput;
