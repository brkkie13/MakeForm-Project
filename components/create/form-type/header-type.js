'use client';
import styled from 'styled-components';

// components
import TitleInput from '../ui/title-input';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@/redux/features/form-slice';

// css
const Article = styled.article`
  input {
    width: 400px;
    background: white;
    font-size: 20px;
  }
`;

// code
function HeaderType() {
  const dispatch = useDispatch();
  const headerValue = useSelector(state => state.form.headerValue);

  const changeHeaderHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeHeaderValue(newValue));
  };

  return (
    <Article>
      <input
        value={headerValue}
        onChange={changeHeaderHandler}
        placeholder="폼 주제를 입력하세요 (ex: 고객 만족도 조사)"
      />
    </Article>
  );
}

export default HeaderType;
