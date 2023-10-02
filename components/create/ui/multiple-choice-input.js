'use client';
import styled from 'styled-components';
import { useState } from 'react';

// Components
import CheckboxIcon from '../../icons/checkbox-icon';

// CSS
const Label = styled.label`
  background: ${props => props.theme.colors.input};
  padding: 12px 20px;
  gap: 10px;
  border-radius: 5px;
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
