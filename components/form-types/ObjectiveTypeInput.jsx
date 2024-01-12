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
    name,
  } = props;

  // Detail.jsx에서 name(item의 index)프롭을 전달해 같은 질문(item)끼리 input의 name속성을 그룹핑.
  // input과 label의 id를 짝짓을 때 중복되지 않도록 고유하게 지정.
  return (
    <ObjectiveTypeInputStyled>
      {checkable === true && (
        <input
          type="radio"
          name={name}
          id={`${name}-${optionIndex}`}
          value={optionText}
          onChange={onChangeOption}
        />
      )}

      {optionText ? (
        <label htmlFor={`${name}-${optionIndex}`}>
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
