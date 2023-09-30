'use client';
import styled from 'styled-components';
import TitleInput from '../ui/title-input';

const Article = styled.article`
  padding: 20px 0;
`;

function LongAnswerType({ index, value, onChange }) {
  //부모컴포넌트로 title값을 넘겨줌
  const changeTitleHandler = event => {
    const newValue = event.target.value;
    onChange(index, {
      ...value,
      title: newValue,
    });
  };

  return (
    <Article>
      <TitleInput value={value.title} onChange={changeTitleHandler} />
      <div>장문 텍스트 답변</div>
    </Article>
  );
}

export default LongAnswerType;
