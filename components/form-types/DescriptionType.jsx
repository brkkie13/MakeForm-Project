'use client';
import styled from 'styled-components';

// components
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// css
const Article = styled.article`
  textarea {
    width: 400px;
    background: white;
    font-size: 20px;
  }
`;

// code
function DescriptionType({ index }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);

  const changeDescriptionHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeDescriptionValue({ index, newValue }));
  };

  return (
    <Article>
      <textarea
        value={components[index].description}
        onChange={changeDescriptionHandler}
        placeholder="설명을 입력하세요"
      />
    </Article>
  );
}

export default DescriptionType;
