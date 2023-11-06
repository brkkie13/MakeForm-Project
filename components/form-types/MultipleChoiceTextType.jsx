'use client';

// css
import { OptionsWrapper } from './MultipleChoiceTextType.styles';

// components
import Button, { SmallButton } from '../ui/Button';
import MultipleChoiceInput from '../ui/MultipleChoiceInput';
import { RemoveBadge } from '../../\bstyles/Icons';
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import FormTypeCard from '../ui/FormTypeCard';

// code
function MultipleChoiceTextType({ index, editItem }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);
  const options = components[index]?.options;

  // edit
  const editItems = useSelector(state => state.form.editItems);
  let editItemIndex;
  let editItemOptions;
  let lastOptionId;

  if (editItems.length > 0) {
    editItemIndex = editItems.findIndex(item => item.id === editItem.id);
    editItemOptions = editItems[editItemIndex].options;
    // options배열에서 마지막 옵션 id를 추출해 옵션추가시 +1씩 증가시켜 옵션 id를 설정.
    lastOptionId = editItemOptions[editItemOptions.length - 1].id;
  }

  const addOptionHandler = () => {
    // edit모드일 때만 옵션 추가 시 lastOptionId +1씩 증가시킴.
    editItem && lastOptionId++;
    dispatch(
      formActions.addOption(
        editItem
          ? { editItemIndex, lastOptionId, isEdit: true }
          : { index, isEdit: false }
      )
    );
  };

  const removeOptionHandler = optionId => {
    dispatch(
      formActions.removeOption(
        editItem
          ? { editItemIndex, optionId, isEdit: true }
          : { index, optionId, isEdit: false }
      )
    );
  };

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeTitle(
        editItem
          ? { editItemIndex, newValue, isEdit: true }
          : { index, newValue, isEdit: false }
      )
    );
  };

  const changeOptionHandler = (optionId, event) => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeOption(
        editItem
          ? { editItemIndex, optionId, newValue, isEdit: true }
          : { index, optionId, newValue, isEdit: false }
      )
    );
  };

  // editItem이 있다면(수정모드) editItemOptions를 map메서드로 순회.
  const optionsToRender = editItem ? editItemOptions : options;

  return (
    <>
      <TitleInputArea
        name="title"
        value={
          editItem ? editItems[editItemIndex].title : components[index].title
        }
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />

      <OptionsWrapper>
        {optionsToRender.map((option, idx) => (
          <div className="option" key={option.id}>
            {/* 처음 두개옵션은 x표시 안뜨게 함. index가 2인 옵션부터 x표시 렌더링 */}
            {idx > 1 && (
              <RemoveBadge onClick={() => removeOptionHandler(option.id)} />
            )}
            <MultipleChoiceInput
              name="text"
              value={option.text}
              onChange={event => changeOptionHandler(option.id, event)}
            />
          </div>
        ))}
      </OptionsWrapper>
      <SmallButton onClick={addOptionHandler}>+ 옵션 추가</SmallButton>
    </>
  );
}

export default MultipleChoiceTextType;
