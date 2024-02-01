import styled from 'styled-components';

export const MobileNavbarStyled = styled.nav`
  @media screen and (min-width: 1001px) {
    display: none;
  }

  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 70px;
  background: ${props => props.theme.colorBackground0};
  border-top: 1px solid ${props => props.theme.colorGrayLightest};

  ul {
    display: flex;
    justify-content: space-between;
    height: 100%;
  }

  li {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 7px;

    svg {
      width: 25px;
      height: 23px;
      fill: ${props => props.theme.colorGrayHeavy};
    }

    span {
      font-size: 12px;
      color: ${props => props.theme.colorGrayHeavy};
      font-weight: 600;
    }
  }

  a:hover {
    svg {
      fill: ${props => props.theme.colorBlue0};
    }

    span {
      color: ${props => props.theme.colorGrayHeaviest};
    }
  }

  // 현재 클릭된 메뉴에 색상 넣기
  .active {
    svg {
      fill: ${props => props.theme.colorBlue0};
    }

    span {
      color: ${props => props.theme.colorBlue0};
    }
  }
`;
