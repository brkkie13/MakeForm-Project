import styled from 'styled-components';

export const DropdownMenuStyled = styled.div`
  position: absolute;
  z-index: 10;
  top: 70px;
  right: 30px;
  min-width: 160px;
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.pointSkyblue};
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);

  ul {
    display: flex;
    flex-direction: column;
    margin: 8px 0;
  }

  li {
    padding: 13px 20px;
  }

  li:hover,
  li:active {
    background: ${props => props.theme.colors.hoverMenu};
    color: ${props => props.theme.colors.pointSkyblue};
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
