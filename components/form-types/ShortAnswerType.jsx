'use client';
import styled from 'styled-components';

// css

// components
import FormTypeCard from '../ui/FormTypeCard';
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// code
function ShortAnswerType({ index }) {
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
      <p>단답 답변</p>
    </FormTypeCard>
  );
}

export default ShortAnswerType;
