import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const PaginationStyled = styled.nav<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 30px; // 페이지네이션 위~게시글 아래 사이 여백

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
