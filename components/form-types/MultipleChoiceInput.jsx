import { MultipleChoiceInputStyled } from '@components/form-types/MultipleChoiceInput.styles';

// code
function MultipleChoiceInput(props) {
  const {
    value,
    onChange,
    optionIndex,
    optionText,
    checkable,
    onChangeOption,
  } = props;

  return (
    <MultipleChoiceInputStyled>
      {/* 체크 가능할 때만 radio 활성화 */}
      {checkable === true && (
        <input
          type="radio"
          name="radio-group"
          id={optionIndex}
          value={optionText}
          onChange={onChangeOption}
        />
      )}

      {optionText ? (
        <label htmlFor={optionIndex}>
          <span>{optionText}</span>
        </label>
      ) : (
        <label>
          <input value={value} onChange={onChange} placeholder="입력" />
        </label>
      )}
    </MultipleChoiceInputStyled>
  );
}

export default MultipleChoiceInput;
