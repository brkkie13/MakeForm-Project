'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import { InputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function DescriptionType({ index, editItem }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  // edit
  const editItems = useSelector(state => state.form.editItems);
  let editItemIndex;
  if (editItem && editItems.length > 0) {
    editItemIndex = editItems.findIndex(item => item.id === editItem.id);
  }

  const changeDescriptionHandler = event => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeDescription(
        editItem
          ? { editItemIndex, newValue, isEdit: true }
          : { index, newValue, isEdit: false }
      )
    );
  };

  return (
    <>
      <InputArea
        value={
          editItem
            ? editItems[editItemIndex].description
            : components[index].description
        }
        onChange={changeDescriptionHandler}
        placeholder="설명을 입력하세요"
      />
    </>
  );
}

export default DescriptionType;
