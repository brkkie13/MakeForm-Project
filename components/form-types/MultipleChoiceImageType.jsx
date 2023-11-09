'use client';

// css

// components
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import FormTypeCard from '../ui/FormTypeCard';

function MultipleChoiceImageType({ index, editItem }) {
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
      <p>이미지형 객관식</p>
    </>
  );
}

export default MultipleChoiceImageType;
