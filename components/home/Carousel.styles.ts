import styled from 'styled-components';

type Props = {
  $activeIndex: number;
};

export const CarouselStyled = styled.article<Props>`
  overflow: hidden;
  height: 400px;
  width: 100vw;
  position: relative;
  display: flex;
  background-color: ${props => props.theme.colorBlueBackground};

  .inner {
    transform: translate(${props => props.$activeIndex * -100}%);
    white-space: nowrap;
    transition: transform 0.5s;
    width: 100%;
    height: 100%;
  }

  .controls {
    display: flex;
    align-items: center;

    // 가운데로 위치
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);

    svg {
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      fill: white;
    }
    // 오른쪽 화살표 회전
    svg:nth-child(3) {
      transform: rotate(180deg);
    }

    .carousel-dots {
      display: flex;
      gap: 15px;
      margin: 0 60px;
    }

    .dot {
      width: 10px;
      height: 10px;
      background-color: ${props => props.theme.colorGrayHeaviest};
      border-radius: 50%;
      transition: 0.5s ease;
    }

    .dot-active {
      width: 40px;
      background-color: ${props => props.theme.colorBlue0};
      border-radius: ${props => props.theme.radiusMax};
    }
  }
`;
