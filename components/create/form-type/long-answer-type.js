'use client';
import styled from 'styled-components';
import TitleInput from '../ui/title-input';

const Article = styled.article`
  padding: 20px 0;
`;

function LongAnswerType(props) {
  return (
    <Article>
      <TitleInput setData={props.setSubmitData} />
      <div>장문 텍스트 답변</div>
    </Article>
  );
}

export default LongAnswerType;
