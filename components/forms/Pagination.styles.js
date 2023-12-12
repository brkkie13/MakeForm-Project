import styled from 'styled-components';

export const PaginationStyled = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ul {
    display: flex;
    gap: 10px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35px;
    height: 35px;
    border-radius: 5px;
  }

  li.active {
    background-color: ${props => props.theme.colors.pointSkyblue};
    color: white;
  }

  svg {
    fill: gray;
    cursor: pointer;
  }

  svg:nth-child(4),
  svg:nth-child(5) {
    transform: rotate(180deg);
  }
`;
