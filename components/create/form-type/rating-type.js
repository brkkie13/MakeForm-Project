'use client';
import styled from 'styled-components';
import TitleInput from '../ui/title-input';
import StarIcon from '../../icons/star-icon';

const Article = styled.article`
  padding: 20px 0;
`;

function RatingType(props) {
  return (
    <Article>
      <TitleInput setData={props.setSubmitData} />
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
