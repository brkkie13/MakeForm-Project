import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const ModalStyled = styled.div<Props>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: ${props => props.theme.zIndex.level5};
  display: flex;
  justify-content: center;
  align-items: center;

  .modal-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-content {
    width: 500px;
    border-radius: ${props => props.theme.radius.large};
    background: ${props => props.theme.colorBackground0};
    box-shadow: ${props => props.theme.shadow};
    display: flex;
    flex-direction: column;
    padding: 25px;
    z-index: ${props => props.theme.zIndex.level5};

    .header {
      display: flex;
      justify-content: end;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: ${props => props.theme.width.mobile}) {
    .modal-content {
      margin-left: 10%;
      margin-right: 10%;
    }
  }
`;
