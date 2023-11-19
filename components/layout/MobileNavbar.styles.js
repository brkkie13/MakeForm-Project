import styled from 'styled-components';

export const MobileNavbarStyled = styled.nav`
  @media screen and (min-width: 769px) {
    display: none;
  }

  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 100;
  height: 70px;
  background-color: ${props => props.theme.colors.background};
  border-top: 1px solid ${props => props.theme.colors.border};

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
      height: 25px;
    }

    span {
      font-size: 12px;
    }
  }

  // 현재 클릭된 메뉴에 색상 넣기
  .active {
    span {
      color: ${props => props.theme.colors.pointSkyblue};
    }
    svg {
      fill: ${props => props.theme.colors.pointSkyblue};
    }
  }
`;
