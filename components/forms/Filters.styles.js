import styled from 'styled-components';

export const FiltersStyled = styled.div`
  display: flex;
  flex-direction: column;

  .filters-group {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 15px;
    margin-bottom: 20px;
  }

  select,
  label {
    display: flex;
    align-items: center;
    background: ${props => props.theme.colors.block};
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0 10px;

    &:focus-within {
      border: 1.5px solid ${props => props.theme.colors.pointSkyblue};
    }

    svg {
      fill: lightgray;
      margin-right: 5px;
    }
  }

  .search-button,
  .search-mobile {
    display: none;
  }

  @media screen and (max-width: 768px) {
    .search-pc {
      display: none;
    }

    .search-button,
    .search-mobile {
      display: flex;
    }
  }
`;
