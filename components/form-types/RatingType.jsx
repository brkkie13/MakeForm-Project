'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import TitleInput from '../ui/TitleInput';
import StarIcon from '../icons/StarIcon';

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
      <TitleInput
        value={components[index].title}
        onChange={changeTitleHandler}
      />
      <div className="stars">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
    </FormTypeCard>
  );
}

export default RatingType;
