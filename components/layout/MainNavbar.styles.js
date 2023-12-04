import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 30px;
  z-index: 100;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .logo svg {
    width: 150px;
  }
  nav {
    ul {
      display: flex;
      gap: 30px;
    }

    li {
      background: transparent;
      padding: 8px 14px;
      border-radius: 5px;
    }

    li:hover {
      background: ${props => props.theme.colors.hoverMenu};
    }

    li.active {
      background: ${props => props.theme.colors.activeMenu};
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
  }

  .control {
    display: flex;
    gap: 7px;
  }

  // 너비가 줄어들면 nav의 메뉴가 숨겨지게 함.
  @media screen and (max-width: 1000px) {
    justify-content: initial;

    .logo {
      padding-right: 40px;
    }

    nav {
      overflow-x: auto;
      white-space: nowrap;
      margin-right: 20px;
    }

    nav::-webkit-scrollbar {
      display: none;
    }

    .controls {
      margin-left: auto;
      z-index: 200;

      white-space: nowrap;
    }
  }

  // 너비가 모바일이면 메뉴대신 하단메뉴바가 생김.
  @media screen and (max-width: 768px) {
    height: 60px;

    nav,
    .auth-control {
      display: none;
    }

    .logo svg {
      width: 140px;
    }
  }
`;
