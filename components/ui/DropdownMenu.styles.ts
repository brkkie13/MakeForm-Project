import styled from 'styled-components';

export const DropdownMenuStyled = styled.div`
  position: absolute;
  z-index: 10;
  top: 70px;
  right: 30px;
  min-width: 160px;
  background: ${props => props.theme.colorBackground0};
  border: 1px solid ${props => props.theme.colorBlue0};
  border-radius: ${props => props.theme.radiusMedium};
  box-shadow: ${props => props.theme.shadow};

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
    background: ${props => props.theme.colorBackground1};
    color: ${props => props.theme.colorBlue0};
  }

  @media screen and (max-width: ${props => props.theme.mobileWidth}) {
    display: none;
  }
`;
