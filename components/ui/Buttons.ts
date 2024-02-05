import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const ButtonStyled = styled.button`
  color: ${props => props.theme.colorBlue0};
  display: flex;
  align-items: center;
  gap: 3px;

  a {
    display: flex;
    align-items: center;
    gap: 3px;
  }

  svg {
    fill: ${props => props.theme.colorBlue0};
    color: ${props => props.theme.colorBlue0};
  }

  &:hover {
    color: ${props => props.theme.colorBlue1};
    svg {
      fill: ${props => props.theme.colorBlue1};
      color: ${props => props.theme.colorBlue1};
    }
  }
`;

export const FilledButtonStyled = styled(ButtonStyled)<Props>`
  background: ${props => props.theme.colorBlue0};
  border: 1px solid ${props => props.theme.colorBlue0};
  color: ${props => props.theme.colorBackground0};
  border-radius: ${props => props.theme.radius.small};
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    fill: ${props => props.theme.colorBackground0};
    color: ${props => props.theme.colorBackground0};
  }

  &:hover {
    background: ${props => props.theme.colorBlue1};
    border: 1px solid ${props => props.theme.colorBlue1};
    color: ${props => props.theme.colorBackground0};
  }
`;

export const OutlinedButtonStyled = styled(FilledButtonStyled)<Props>`
  background: transparent;
  color: ${props => props.theme.colorBlue0};

  svg {
    fill: ${props => props.theme.colorBlue0};
  }

  &:hover {
    background: transparent;
    color: ${props => props.theme.colorBlue1};
    svg {
      fill: ${props => props.theme.colorBlue1};
    }
  }
`;

export const RoundedButtonStyled = styled(OutlinedButtonStyled)<Props>`
  border-radius: ${props => props.theme.radius.max};
`;

export const IconButtonStyled = styled.button<Props>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colorGrayLightest};
    stroke: ${props => props.theme.colorGrayLightest};
  }

  &:hover {
    svg {
      fill: ${props => props.theme.colorBlue0};
      stroke: ${props => props.theme.colorBlue0};
    }

    span {
      color: ${props => props.theme.colorBlue0};
    }
  }

  span {
    display: none;
  }

  @media (max-width: ${props => props.theme.width.tablet}) {
    span {
      display: block;
      font-size: 15px;
      color: ${props => props.theme.colorGrayLightest};
    }
  }
`;

export const PaginationButtonStyled = styled.li<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: ${props => props.theme.radius.small};
  color: ${props => props.theme.colorGrayLight};

  &:hover {
    color: ${props => props.theme.colorGrayHeavy};
  }

  &.active {
    background: ${props => props.theme.colorBlue0};
    color: ${props => props.theme.colorBackground0};
  }
`;
