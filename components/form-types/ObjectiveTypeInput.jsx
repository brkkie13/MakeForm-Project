import { ObjectiveTypeInputStyled } from './ObjectiveTypeInput.styles';

// code
function ObjectiveTypeInput(props) {
  const {
    value,
    onChange,
    optionIndex,
    optionText,
    checkable,
    onChangeOption,
  } = props;

  return (
    <ObjectiveTypeInputStyled>
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
    </ObjectiveTypeInputStyled>
  );
}

export default ObjectiveTypeInput;
