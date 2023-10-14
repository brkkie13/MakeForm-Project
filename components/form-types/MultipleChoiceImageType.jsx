'use client';
import styled from 'styled-components';
import TitleInput from '../ui/TitleInput';

const Article = styled.article`
  padding: 20px 0;
`;

function MultipleChoiceImageType(props) {
  return (
    <Article>
      <TitleInput />
      <div>이미지형 객관식</div>
    </Article>
  );
}

export default MultipleChoiceImageType;
