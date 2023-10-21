'use client';

// css

// components
import { TitleInputArea } from '../ui/InputArea';

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
      <TitleInputArea
        value={components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <p>이미지형 객관식</p>
    </FormTypeCard>
  );
}

export default MultipleChoiceImageType;
