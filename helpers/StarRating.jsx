import { useState } from 'react';
import { StarsWrapper } from './StarRating.styles';
import { StarIcon } from '../\bstyles/Icons';

// code
function StarRating() {
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
    // for문 사용
    // let copiedClickedStars = [...clickedStars];
    // for (let i = 0; i < clickedStars.length; i++) {
    //   copiedClickedStars[i] = i <= idx ? true : false;
    // }
    const copiedClickedStars = clickedStars.map(
      (star, starIdx) => starIdx <= idx && (star = true)
    );
    setClickedStars(copiedClickedStars);
  };

  // console.log(clickedStars);
  // console.log(score);

  return (
    <StarsWrapper>
      {clickedStars.map((el, idx) => (
        <StarIcon
          className={idx + 1 <= score ? 'active' : ''}
          key={idx}
          onClick={() => clickStarHandler(idx)}
        />
      ))}
    </StarsWrapper>
  );
}

export default StarRating;
