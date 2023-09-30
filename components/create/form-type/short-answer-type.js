'use client';
import styled from 'styled-components';
import TitleInput from '../ui/title-input';

const Article = styled.article`
  padding: 20px 0;
`;

function ShortAnswerType({ index, value, onChange }) {
  //부모컴포넌트로 title값을 보내줌.
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
      <div>단답 답변</div>
    </Article>
  );
}

export default ShortAnswerType;
