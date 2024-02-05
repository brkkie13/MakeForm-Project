import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const FiltersStyled = styled.div<Props>`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px; // 필터 아래~게시글 위 사이 여백

  .filters-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;
  }

  select,
  label {
    display: flex;
    align-items: center;
    background: ${props => props.theme.colorBackground0};
    border: 1px solid ${props => props.theme.colorBackground0};
    border-radius: ${props => props.theme.radius.small};
    padding: 0 10px;
    box-shadow: ${props => props.theme.shadow};

    &:focus-within {
      border: 1px solid ${props => props.theme.colorBlue0};
      box-shadow: none;
    }

    svg {
      fill: ${props => props.theme.colorGrayLight};
      margin-right: 5px;
    }
  }

  .form-filter-pc {
    max-width: 210px;
  }

  .search-button,
  .form-filter-button,
  .search-mobile,
  .form-filter-mobile {
    display: none;
  }

  @media screen and (max-width: ${props => props.theme.width.mobile}) {
    .search-pc,
    .form-filter-pc {
      display: none;
    }

    .search-button,
    .form-filter-button,
    .search-mobile,
    .form-filter-mobile {
      display: flex;
    }

    .search-mobile,
    .form-filter-mobile {
      padding: 10px;
      margin-top: 10px;
    }
  }
`;
