import styled from 'styled-components';

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  border-bottom: 1px solid ${props => props.theme.colors.border};

  .logo svg {
    width: 180px;
  }

  ul {
    display: flex;
    gap: 30px;
  }

  li {
    background: transparent;
    padding: 8px 14px;
    border-radius: 5px;
  }

  li span {
    margin-right: 5px;
  }

  li:hover {
    background: ${props => props.theme.colors.hoverMenu};
  }

  li.active {
    background: ${props => props.theme.colors.activeMenu};
  }

  .controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .control {
    display: flex;
    gap: 7px;
  }

  .theme-icon {
    width: 30px;
    height: 30px;
  }
`;
