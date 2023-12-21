import styled from 'styled-components';

export const ErrorBoxStyled = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colorGrayLight};
  border-radius: ${props => props.theme.radiusMedium};
  padding: 14px 18px;
  margin-bottom: 30px;
  gap: 8px;

  svg {
    min-width: 20px;
    min-height: 20px;
    fill: ${props => props.theme.colorRed};
  }

  p {
    color: ${props => props.theme.colorGrayLight};
  }
`;
