'use client';
import styled from 'styled-components';

import { useEffect, useState, useCallback, Fragment } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import DescriptionType from '../../../../components/create/form-type/description-type';
import HeaderType from '../../../../components/create/form-type/header-type';
import Button from '../../../../components/ui/button';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '@/redux/actions';
import { removeFormData } from '@/redux/actions';
import { myFormActions } from '@/redux/features/my-form-slice';

const Section = styled.section`
  h1 {
    font-size: 30px;
  }
`;

function FormDetailPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId;
  const dispatch = useDispatch();
  const formList = useSelector(state => state.myForm.formList);

  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  const targetedForm = formList.find(form => form.id === formId);
  console.log('targetedForm =>', targetedForm);

  const onEditHandler = useCallback(() => {
    const editPagePath = `/my-form/${formId}/edit`;
    router.push(editPagePath);
  }, []);

  const removeFormHandler = useCallback(() => {
    if (window.confirm('삭제하시겠습니까?')) {
      dispatch(removeFormData(formId));
      router.push('/my-form');
    }
  }, [formList]);

  return (
    <Section>
      {/* CSR시 targetedForm이 일시적으로 비어있는 상태에 생기는 에러를 해결 */}
      {!targetedForm ? (
        <div>로딩중입니다</div>
      ) : (
        <section>
          <h1>{targetedForm.header}</h1>
          <div>
            {targetedForm.items.map(item => (
              <Fragment key={item.id}>
                <h2>{item.title}</h2>
                <div>
                  {item.options?.map(option => (
                    <div key={option.id}>{option.text}</div>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </section>
      )}
      <div className="controls">
        <Button onClick={onEditHandler}>수정</Button>
        <Button onClick={removeFormHandler}>삭제</Button>
      </div>
    </Section>
  );
}

export default FormDetailPage;
