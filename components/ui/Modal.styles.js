import styled from 'styled-components';

export const ModalBackground = styled.div`
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200; // MainNavbar 위로 설정
`;

export const ModalContainer = styled.div`
  width: 500px;
  /* height: 500px; */
  border-radius: 12px;
  background: ${props => props.theme.colors.block};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;

  & > div {
    display: flex;
    flex-direction: column;
  }

  svg {
    width: 30px;
    height: 30px;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .body {
    margin-top: 20px;
  }
`;
