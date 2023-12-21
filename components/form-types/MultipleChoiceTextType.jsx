'use client';

// components
import { RemoveBadge } from '../../\bstyles/Icons';
import { TitleInputArea } from '../ui/InputArea';
import MultipleChoiceInput from '../ui/MultipleChoiceInput';
import { InputOptionsStyled } from '../ui/InputOptionsStyled';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import { RoundedButtonStyled } from '../ui/Buttons';

// code
function MultipleChoiceTextType({ index, isEdit }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);
  const options = components[index]?.options;

  const editItems = useSelector(state => state.form.editItems);
  let editItemOptions;
  let lastOptionId;

  if (editItems.length > 0) {
    editItemOptions = editItems[index].options;
    if (editItemOptions) {
      // options배열에서 마지막 옵션 id를 추출해 옵션추가시 +1씩 증가시켜 옵션 id를 설정.
      lastOptionId = editItemOptions[editItemOptions.length - 1].id;
    }
  }

  const addOptionHandler = () => {
    // edit모드일 때만 옵션 추가 시 lastOptionId +1씩 증가시킴.
    isEdit && lastOptionId++;
    dispatch(
      formActions.addOption(
        isEdit
          ? { index, lastOptionId, isEdit: true }
          : { index, isEdit: false }
      )
    );
  };

  const removeOptionHandler = optionId => {
    dispatch(formActions.removeOption({ index, optionId, isEdit: isEdit }));
  };

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue, isEdit: isEdit }));
  };

  const changeOptionHandler = (optionId, event) => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeOption({ index, optionId, newValue, isEdit: isEdit })
    );
  };

  // isEdit이 true(수정모드)라면 editItemOptions를 map메서드로 순회.
  const optionsToRender = isEdit ? editItemOptions : options;

  return (
    <>
      <TitleInputArea
        value={isEdit ? editItems[index].title : components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />

      <InputOptionsStyled>
        {optionsToRender.map((option, idx) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
            )}
            <MultipleChoiceInput
              value={option.text}
              onChange={event => changeOptionHandler(option.id, event)}
            />
          </div>
        ))}
      </InputOptionsStyled>
      <RoundedButtonStyled onClick={addOptionHandler}>
        + 옵션 추가
      </RoundedButtonStyled>
    </>
  );
}

export default MultipleChoiceTextType;
