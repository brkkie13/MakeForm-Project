import styled from 'styled-components';

export const ModalStyled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200; // MainNavbar 위로 설정
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
    border-radius: ${props => props.theme.radiusLarge};
    background: ${props => props.theme.colorBackground0};
    box-shadow: ${props => props.theme.shadow};
    display: flex;
    flex-direction: column;
    padding: 25px;
    z-index: 200;

    .header {
      display: flex;
      justify-content: end;

      svg {
        width: 30px;
        height: 30px;
      }
    }
  }

  @media (max-width: ${props => props.theme.mobileWidth}) {
    .modal-content {
      margin-left: 10%;
      margin-right: 10%;
    }
  }
`;
