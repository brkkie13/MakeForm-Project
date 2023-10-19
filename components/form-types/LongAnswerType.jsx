'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function LongAnswerType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue }));
  };

  return (
    <FormTypeCard>
      <TitleInput
        value={components[index].title}
        onChange={changeTitleHandler}
      />
      <div>장문 텍스트 답변</div>
    </FormTypeCard>
  );
}

export default LongAnswerType;
