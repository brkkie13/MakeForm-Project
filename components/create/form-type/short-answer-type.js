'use client';
import styled from 'styled-components';

const Article = styled.article`
  padding: 20px 0;
`;

function ShortAnswerType() {
  return (
    <Article>
      <input type="text" placeholder="질문을 입력하세요." />
      <div>단답 답변</div>
    </Article>
  );
}

export default ShortAnswerType;
