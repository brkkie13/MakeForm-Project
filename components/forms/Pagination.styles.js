import styled from 'styled-components';

export const PaginationStyled = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  ol {
    display: flex;
    gap: 10px;
  }

  svg {
    fill: ${props => props.theme.colorGrayLightest};
    cursor: pointer;
  }

  svg:nth-child(4),
  svg:nth-child(5) {
    transform: rotate(180deg);
  }
`;
