import styled from 'styled-components';

const BUTTON_TYPE = {
  NON_OUTLINE: 'non-outline',
  HIGHLIGHT: 'highlight',
};

export const Button = styled.button`
  padding: 6px 12px;
  border-radius: 5px;
  line-height: 1.5;
  transition: 0.2s all ease-out;

  border: 1px solid ${props => props.theme.colors.pointSkyblue};
  border: ${props => props.primary === BUTTON_TYPE.NON_OUTLINE && 'none'};

  color: ${props =>
    props.primary === BUTTON_TYPE.HIGHLIGHT
      ? '#fff'
      : props.theme.colors.pointSkyblue};

  background-color: ${props =>
    props.primary === BUTTON_TYPE.HIGHLIGHT && props.theme.colors.pointSkyblue};

  &:hover {
    background: ${props =>
      props.primary === BUTTON_TYPE.HIGHLIGHT &&
      props.theme.colors.pointSkyblue2};
    border-color: ${props =>
      props.primary === BUTTON_TYPE.HIGHLIGHT &&
      props.theme.colors.pointSkyblue2};
  }
`;

export const SmallButton = styled(Button)`
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 30px;
`;

export const IconButtonStyled = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  &:hover {
    background-color: ${props => props.theme.colors.hoverMenu};
  }
`;
