import styled, { keyframes, Theme } from 'styled-components';

type Props = {
  status: string;
  theme: Theme;
};

const fadeInOut = keyframes`
  0% {
    bottom: 0;
    opacity: 0;
  }

  20% {
    bottom: 30px;
    opacity: 1;
  }

  80% {
    bottom: 30px;
    opacity: 1;
  }

  100% {
    bottom: 0;
    opacity: 0;
  }
`;

export const NotificationStyled = styled.div<Props>`
  z-index: ${props => props.theme.zIndex.level6};
  animation: ${fadeInOut} 3s ease-in-out;
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%); // x축, y축 모두 중심축으로 옴
  display: flex;
  align-items: center;
  padding: 10px 15px;
  max-width: 300px;
  border-radius: ${props => props.theme.radius.medium};
  background: ${props => props.theme.colorBackground0};
  border: 1px solid
    ${props =>
      props.status === 'success'
        ? props.theme.colorBlue0
        : props.theme.colorRed};

  svg {
    fill: ${props =>
      props.status === 'success'
        ? props.theme.colorBlue0
        : props.theme.colorRed};
  }

  // badge
  & > div:nth-child(1) {
    margin-right: 10px;
  }

  // message
  & > div:nth-child(2) {
    color: ${props =>
      props.status === 'success'
        ? props.theme.colorBlue0
        : props.theme.colorRed};
  }
`;
