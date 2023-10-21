'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import { InputArea } from '../ui/InputArea';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function DescriptionType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeDescriptionHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeDescription({ index, newValue }));
  };

  const removeFormTypeHandler = () => {};

  return (
    <FormTypeCard>
      <InputArea
        value={components[index].description}
        onChange={changeDescriptionHandler}
        placeholder="설명을 입력하세요"
      />
    </FormTypeCard>
  );
}

export default DescriptionType;
