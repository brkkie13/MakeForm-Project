import { useState, useEffect } from 'react';
import { CarouselStyled } from './Carousel.styles';
import CarouselItem from './CarouselItem';
import { ArrowIcon } from '../assets/Icons';

// code
function Carousel() {
  const items = [
    {
      id: 1,
      title: '간단한 폼 추가',
      description: '폼의 질문을 추가하고 삭제하고 순서를 바꿀 수 있습니다.',
      image: '/images/illustration1.svg',
    },
    {
      id: 2,
      title: '내가 만든 폼 보기',
      description: '내가 만든 폼을 수정하고 공유할 수 있습니다.',
      image: '/images/illustration2.svg',
    },
    {
      id: 3,
      title: '고객들의 응답 보기',
      description:
        '내가 만든 폼에 들어온 응답을 확인하고 엑셀 다운로드를 해보세요.',
      image: '/images/illustration3.svg',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // 화살표 또는 점을 눌렀을 때 캐러셀 이동
  const updateActiveIndex = increment => {
    setActiveIndex(prevActiveIndex => {
      const newIndex = prevActiveIndex + increment;
      if (newIndex < 0) {
        // 새로 바꿀 인덱스가 0보다 작으면 마지막 인덱스로 변경
        return items.length - 1;
      } else if (newIndex >= items.length) {
        // 새로 바꿀 인덱스가 마지막 인덱스보다 크다면 첫번째 인덱스로 변경
        return 0;
      }
      return newIndex; // 0이상 마지막 인덱스 이하이면 newIndex로 변경
    });
  };

  // 캐러셀이 자동으로 돌아가게 함
  useEffect(() => {
    const interval = setInterval(() => updateActiveIndex(1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselStyled $activeIndex={activeIndex}>
      <div className="inner">
        {items.map((item, idx) => (
          <CarouselItem key={idx} item={item} />
        ))}
      </div>

      <div className="controls">
        <ArrowIcon onClick={() => updateActiveIndex(-1)} />
        <div className="carousel-dots">
          {items.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`dot ${idx === activeIndex ? 'dot-active' : ''}`}
            ></div>
          ))}
        </div>
        <ArrowIcon onClick={() => updateActiveIndex(1)} />
      </div>
    </CarouselStyled>
  );
}

export default Carousel;
