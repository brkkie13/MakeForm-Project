'use client';
import styled, { css } from 'styled-components';

// CSS
const StyledButton = styled.button`
  padding: 6px 12px;
  border: 1px solid #b3b3b3;
  border-radius: 7px;
  line-height: 1.5;
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button;
