import { useState } from 'react';
import { StarsStyled } from '@components/ui/StarRating.styles';
import { StarIcon } from '@components/assets/Icons';

// code
function StarRating({ onChangeRating }) {
  const [clickedStars, setClickedStars] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  let score = clickedStars.filter(Boolean).length;

  // 클릭된 별의 index번호만큼 clickedStars배열의 index번호까지 true로 바꿔줌.
  const clickStarHandler = idx => {
    const copiedClickedStars = clickedStars.map(
      (star, starIdx) => starIdx <= idx && (star = true)
    );
    setClickedStars(copiedClickedStars);
    const newScore = copiedClickedStars.filter(Boolean).length;

    // 부모 컴포넌트로부터 onChangeRating함수를 전달 받았을 때만 실행(부모컴포넌트로 별점 score 전달)
    onChangeRating && onChangeRating(newScore);
  };

  return (
    <StarsStyled>
      {clickedStars.map((el, idx) => (
        <StarIcon
          className={idx + 1 <= score ? 'active' : ''}
          key={idx}
          onClick={() => clickStarHandler(idx)}
        />
      ))}
    </StarsStyled>
  );
}

export default StarRating;
