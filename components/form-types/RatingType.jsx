'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import StarRating from '../../helpers/StarRating';
import { TitleInputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function RatingType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue }));
  };

  return (
    <FormTypeCard>
      <TitleInputArea
        value={components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <StarRating />
    </FormTypeCard>
  );
}

export default RatingType;
