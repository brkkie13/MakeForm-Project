import { useState } from 'react';
import { MultipleChoiceInputStyled } from './MultipleChoiceInput.styles';

function MultipleChoiceInput(props) {
  const { value, onChange, optionId, optionText, checkable } = props;

  const getCheckedOption = e => {
    console.log(e.target.value);
  };

  return (
    <MultipleChoiceInputStyled>
      {/* 체크 가능할 때만 radio 활성화 */}
      {checkable && (
        <input
          type="radio"
          name="radio-group"
          id={`radio${optionId}`}
          value={optionText}
          onChange={getCheckedOption}
        />
      )}

      {optionText ? (
        <label htmlFor={`radio${optionId}`}>{optionText}</label>
      ) : (
        <label>
          <input value={value} onChange={onChange} placeholder="입력" />
        </label>
      )}
    </MultipleChoiceInputStyled>
  );
}

export default MultipleChoiceInput;
