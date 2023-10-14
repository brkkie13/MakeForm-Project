'use client';
import styled from 'styled-components';

// components
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// css
const Article = styled.article`
  padding: 20px 0;
`;

// code
function LongAnswerType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitleValue({ index, newValue }));
  };

  return (
    <Article>
      <TitleInput
        value={components[index].title}
        onChange={changeTitleHandler}
      />
      <div>장문 텍스트 답변</div>
    </Article>
  );
}

export default LongAnswerType;
