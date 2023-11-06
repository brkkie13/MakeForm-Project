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
    background-color: rgba(0, 0, 0, 0.6);
  }

  .modal-content {
    width: 500px;
    border-radius: 12px;
    background: ${props => props.theme.colors.block};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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

    .body {
    }
  }
`;
