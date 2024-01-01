import styled from 'styled-components';

export const FiltersStyled = styled.div`
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
    border-radius: ${props => props.theme.radiusSmall};
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

  .search-button,
  .search-mobile {
    display: none;
  }

  @media screen and (max-width: ${props => props.theme.mobileWidth}) {
    .search-pc {
      display: none;
    }

    .search-button,
    .search-mobile {
      display: flex;
    }

    .search-mobile {
      padding: 10px;
      margin-top: 10px;
    }
  }
`;
