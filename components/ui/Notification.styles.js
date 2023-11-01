import styled, { keyframes } from 'styled-components';

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

export const NotificationBox = styled.div`
  animation: ${fadeInOut} 3s ease-in-out;
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%); // x축, y축 모두 중심축으로 옴
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 46px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid
    ${props =>
      props.status === 'success'
        ? props.theme.colors.pointSkyblue
        : props.theme.colors.pointRed};

  svg {
    fill: ${props =>
      props.status === 'success'
        ? props.theme.colors.pointSkyblue
        : props.theme.colors.pointRed};
  }

  & > div {
    height: 100%;
    display: flex;
    align-items: center;
  }

  & > div:nth-child(1) {
    flex: 2;
    justify-content: center;
  }

  & > div:nth-child(2) {
    flex: 8;
    color: ${props =>
      props.status === 'success'
        ? props.theme.colors.pointSkyblue
        : props.theme.colors.pointRed};
  }
`;
