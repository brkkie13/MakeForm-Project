'use client';
import styled from 'styled-components';

// components
import TitleInput from '../ui/TitleInput';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// css
const Article = styled.article`
  input {
    width: 400px;
    background: white;
    font-size: 20px;
  }
`;

// code
function HeaderType(props) {
  // isEdit이 true일 때(편집모드일 때) input의 value에 기존header값이 들어가도록.
  // const isEdit = useSelector(state => state.myForm.isEdit);
  const { isEdit, targetedHeader } = props;

  const dispatch = useDispatch();
  const headerValue = useSelector(state => state.form.headerValue);

  const changeHeaderHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeHeaderValue(newValue));
  };

  return (
    <Article>
      <input
        value={isEdit ? targetedHeader : headerValue}
        // value={headerValue}
        onChange={changeHeaderHandler}
        placeholder="폼 주제를 입력하세요 (ex: 고객 만족도 조사)"
      />
    </Article>
  );
}

export default HeaderType;
