import styled from 'styled-components';

export const ErrorBoxStyled = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 30px;
  gap: 8px;

  svg {
    min-width: 20px;
    min-height: 20px;
    fill: ${props => props.theme.colors.pointRed};
  }

  p {
    font-weight: 500;
    color: gray;
  }
`;
