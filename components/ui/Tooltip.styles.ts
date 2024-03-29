import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const TooltipWrapper = styled.div`
  position: relative;
`;

export const TooltipStyled = styled.div<Props>`
  position: absolute;
  background: ${props => props.theme.colorBackgroundReverse};
  color: ${props => props.theme.colorWhiteOrBlack};
  padding: 8px 10px;
  border-radius: 5px;
  left: 50%;
  top: 170%;
  transform: translateX(-50%);
  font-size: 15px;
  white-space: nowrap; //한글일 때 글자가 세로로 나오는 경우 해결.
  z-index: ${props => props.theme.zIndex.level3};

  // 말풍선 삼각형 꼬리
  &::before {
    content: '';
    position: absolute;
    top: -15%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 0 10px 10px 10px;
    border-style: solid;
    border-color: transparent transparent
      ${props => props.theme.colorBackgroundReverse} transparent;
  }

  @media (max-width: ${props => props.theme.width.tablet}) {
    display: none;
  }
`;
