import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const ConfirmStyled = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    fill: ${props => props.theme.colorGrayLightest};
    width: 50px;
    height: 50px;
  }

  p {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .controls {
    width: 100%;
    display: flex;
    gap: 15px;

    button {
      flex: 5;
    }
  }
`;
