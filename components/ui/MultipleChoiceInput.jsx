'use client';
import styled from 'styled-components';
import { useState } from 'react';

// Components
import CheckboxIcon from '../icons/CheckboxIcon';

// CSS
const Label = styled.label`
  background: ${props => props.theme.colors.input};
  padding: 12px 20px;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
`;

function MultipleChoiceInput(props) {
  return (
    <Label>
      <CheckboxIcon />
      <input {...props} placeholder="입력" />
    </Label>
  );
}

export default MultipleChoiceInput;
