'use client';

// components
import StarRating from '../../helpers/StarRating';
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

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
      <TitleInputArea
        value={isEdit ? editItems[index].title : components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <StarRating />
    </>
  );
}

export default RatingType;
