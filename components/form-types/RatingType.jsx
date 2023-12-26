'use client';

// components
import StarRating from '@components/ui/StarRating';
import { FormTitleInput } from '@components/ui/FormInputs';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';

// code
function RatingType({ index, isEdit }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);
  const editItems = useSelector(state => state.form.editItems);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue, isEdit: isEdit }));
  };

  return (
    <>
      <FormTitleInput
        value={isEdit ? editItems[index].title : components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <StarRating />
    </>
  );
}

export default RatingType;
