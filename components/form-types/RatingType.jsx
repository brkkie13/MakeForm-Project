'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import StarRating from '../../helpers/StarRating';
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function RatingType({ index, editItem }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  // edit
  const editItems = useSelector(state => state.form.editItems);
  let editItemIndex;
  if (editItems.length > 0) {
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
    <FormTypeCard>
      <TitleInputArea
        value={
          editItem ? editItems[editItemIndex].title : components[index].title
        }
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <StarRating />
    </FormTypeCard>
  );
}

export default RatingType;
