import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const ErrorBoxStyled = styled.div<Props>`
  display: flex;
  align-items: center;
  border: 1px solid ${props => props.theme.colorGrayLight};
  border-radius: ${props => props.theme.radius.medium};
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
