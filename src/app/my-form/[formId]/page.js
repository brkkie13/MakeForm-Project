'use client';
import styled from 'styled-components';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

// components
import DescriptionType from '../../../../components/create/form-type/description-type';
import HeaderType from '../../../../components/create/form-type/header-type';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '@/redux/actions';
import Button from '../../../../components/ui/button';
import { removeFormData } from '@/redux/actions';

const Section = styled.section``;

function FormDetailPage() {
  // 현재 페이지가 수정모드인지 아닌지.
  // const [isEdit, setIsEdit] = useState(false);

  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const formList = useSelector(state => state.myForm.formList);
  const formId = params.formId;

  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  const targetedForm = formList.find(form => form.id === formId);
  console.log(targetedForm);

  // const onEditHandler = () => {
  //   setIsEdit(!isEdit);
  // };

  const removeFormHandler = useCallback(() => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(removeFormData(formId));
      router.push('/my-form');
    }
  }, [formList]);

  // const saveEditHandler = () => {
  //   setIsEdit(!isEdit);
  // };

  return (
    <section>
      <div className="controls">
        {!isEdit ? (
          <>
            <Button>수정</Button>
            <Button onClick={removeFormHandler}>삭제</Button>
          </>
        ) : (
          <Button>수정 완료</Button>
        )}
      </div>
      <section>
        {/* 모드를 두가지(읽는모드/수정모드)로 나눠서 section 렌더링 */}
        <h1>{targetedForm.header}</h1>
      </section>
    </section>
  );
}

export default FormDetailPage;
