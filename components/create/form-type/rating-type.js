'use client';
import styled from 'styled-components';
import TitleInput from '../ui/title-input';
import StarIcon from '../../icons/star-icon';

const Article = styled.article`
  padding: 20px 0;
`;

function RatingType({ index, value, onChange }) {
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
      <div className="stars">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
    </Article>
  );
}

export default RatingType;
