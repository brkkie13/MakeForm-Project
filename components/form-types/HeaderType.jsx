'use client';
import { useState } from 'react';

// css
import { Input } from './HeaderType.styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import { myFormActions } from '../../redux/features/myFormSlice';

// code
function HeaderType({ isEdit }) {
  const dispatch = useDispatch();

  // '/[formId]/edit'페이지에서 'editingHeader'를 전달 받았을 때 실행
  if (isEdit) {
    const editHeader = useSelector(state => state.myForm.editHeader);

    const changeHeaderHandler = event => {
      const newValue = event.target.value;
      dispatch(myFormActions.changeHeader(newValue));
    };

    return (
      <article>
        <Input
          value={editHeader}
          onChange={changeHeaderHandler}
          placeholder="폼 주제를 입력하세요 (ex: 고객 만족도 조사)"
        />
      </article>
    );
  }

  // '/create'페이지에서
  const header = useSelector(state => state.form.header); // 기존에 저장된 헤더값 가져옴.

  const changeHeaderHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeHeader(newValue));
  };

  return (
    <article>
      <Input
        value={header}
        onChange={changeHeaderHandler}
        placeholder="폼 주제를 입력하세요 (ex: 고객 만족도 조사)"
      />
    </article>
  );
}

export default HeaderType;
