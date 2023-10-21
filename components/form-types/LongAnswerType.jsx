'use client';

// components
import FormTypeCard from '../ui/FormTypeCard';
import { TitleInputArea } from '../ui/InputArea';

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
      <TitleInputArea
        value={components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <div>장문 텍스트 답변</div>
    </FormTypeCard>
  );
}

export default LongAnswerType;
