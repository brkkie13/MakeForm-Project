import styled from 'styled-components';

export const PaginationStyled = styled.nav`
  margin-top: 30px;

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
`;
