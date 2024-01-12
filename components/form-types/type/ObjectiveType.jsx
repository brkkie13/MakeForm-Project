'use client';
import { RemoveBadge } from '@components/assets/Icons';
import { FormTitleInput } from '@components/ui/FormInputs';
import ObjectiveTypeInput from '@components/form-types/ObjectiveTypeInput';
import { InputOptionsStyled } from '@components/ui/InputOptionsStyled';
import { RoundedButtonStyled } from '@components/ui/Buttons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';

// code
function ObjectiveType({ index, isEdit }) {
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
      <FormTitleInput
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
            <ObjectiveTypeInput
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

export default ObjectiveType;