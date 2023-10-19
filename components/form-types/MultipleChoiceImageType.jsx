'use client';

// css

// components
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import FormTypeCard from '../ui/FormTypeCard';

function MultipleChoiceImageType({ index }) {
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
      <div>이미지형 객관식</div>
    </FormTypeCard>
  );
}

export default MultipleChoiceImageType;
