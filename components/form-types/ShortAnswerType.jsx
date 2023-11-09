'use client';
import styled from 'styled-components';

// css

// components
import FormTypeCard from '../ui/FormTypeCard';
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function ShortAnswerType({ index, editItem }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  // edit
  const editItems = useSelector(state => state.form.editItems);
  let editItemIndex;
  if (editItem && editItems.length > 0) {
    editItemIndex = editItems.findIndex(item => item.id === editItem.id);
  }

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

  return (
    <>
      <TitleInputArea
        value={
          editItem ? editItems[editItemIndex].title : components[index].title
        }
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <p>단답 텍스트 답변</p>
    </>
  );
}

export default ShortAnswerType;
