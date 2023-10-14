'use client';
import styled from 'styled-components';
import { useMemo } from 'react';

// COMPONENTS
import XIcon from '../icons/XIcon';

// CSS
const Span = styled.span`
  background: #f44336;
  width: 18px;
  height: 18px;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: -5px;
  top: -5px;

  cursor: pointer;
`;

function RemoveBadge(props) {
  return (
    <Span {...props}>
      <XIcon />
    </Span>
  );
}

export default RemoveBadge;
