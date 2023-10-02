'use client';
import styled from 'styled-components';

// components
import TitleInput from '../ui/title-input';
import StarIcon from '../../icons/star-icon';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@/redux/features/form-slice';

// css
const Article = styled.article`
  padding: 20px 0;
`;

// code
function RatingType({ index }) {
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
      <div className="stars">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
    </Article>
  );
}

export default RatingType;
