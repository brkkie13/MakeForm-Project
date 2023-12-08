import styled from 'styled-components';

export const FiltersStyled = styled.div`
  margin: 20px 0;
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;

  select,
  label {
    display: flex;
    align-items: center;
    background: ${props => props.theme.colors.block};
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0 10px;
  }

  svg {
    fill: lightgray;
    margin-right: 5px;
  }
`;
