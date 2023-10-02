'use client';
import styled, { css } from 'styled-components';

// CSS
const StyledButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 7px;
  line-height: 1.5;

  background: ${props => props.background || '#fff'};

  ${props =>
    props.primary &&
    css`
      color: white;
      background: navy;
      border-color: navy;
    `}
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
