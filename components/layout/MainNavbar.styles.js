import styled from 'styled-components';

export const HeaderContainer = styled.div`
  background: ${props => props.theme.colorBackground0};
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 75px;
  z-index: 100;
  width: 100vw;

  @media screen and (max-width: ${props => props.theme.tabletWidth}) {
    height: 60px;
  }
`;

export const HeaderStyled = styled.header`
  width: 1300px;
  padding: 0 30px;

  display: flex;
  align-items: center;

  .logo {
    svg {
      width: 150px;
    }
  }

  nav {
    white-space: nowrap; // 메뉴의 글자가 줄바꿈이 되지 않도록 함
    margin: 0 50px;
    width: 100%;

    ul {
      display: flex;
      justify-content: center;
      gap: 40px;
    }

    li {
      background: transparent;
      padding: 8px 14px;
      border-radius: 5px;

      svg {
        fill: ${props => props.theme.colorGrayHeavy};
      }

      span {
        color: ${props => props.theme.colorGrayHeavy};
        font-weight: 600;
      }
    }

    li:hover {
      svg {
        fill: ${props => props.theme.colorBlue0};
      }

      span {
        color: ${props => props.theme.colorGrayHeaviest};
      }
    }

    li.active {
      svg {
        fill: ${props => props.theme.colorBlue0};
      }

      span {
        color: ${props => props.theme.colorBlackOrWhite};
      }
    }

    .menu-button {
      display: flex;
      align-items: center;
      gap: 7px;
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 20px;
    white-space: nowrap;
  }

  .control {
    display: flex;
    gap: 7px;
  }

  .user-info {
    display: flex;
    align-items: center;
    position: relative; // DropdownMenu 컴포넌트와 관련있음.
    cursor: pointer;
    border-radius: ${props => props.theme.radiusSmall};

    img {
      border-radius: 50%;
      margin-right: 8px;
    }
  }

  .user-info:hover {
    span {
      text-decoration: underline;
    }
  }

  .user-info.active {
    span {
      text-decoration: underline;
    }
  }

  @media screen and (max-width: ${props => props.theme.tabletWidth}) {
    justify-content: initial;

    & {
      justify-content: space-between;
    }

    nav,
    .auth-control {
      display: none;
    }

    .logo svg {
      width: 140px;
    }
  }
`;
