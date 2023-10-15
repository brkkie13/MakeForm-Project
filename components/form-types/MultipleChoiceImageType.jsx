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

function MultipleChoiceImageType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeTitleHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue }));
  };

  return (
    <Article>
      <TitleInput
        value={components[index].title}
        onChange={changeTitleHandler}
      />
      <div>이미지형 객관식</div>
    </Article>
  );
}

export default MultipleChoiceImageType;
