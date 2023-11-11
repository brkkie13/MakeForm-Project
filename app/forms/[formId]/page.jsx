'use client';
import styled from 'styled-components';

import { useEffect, useState, useCallback, Fragment } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormDetail from '../../../components/forms/FormDetail';
import Confirm from '../../../components/Modals/Confirm';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData, removeFormData } from '../../../redux/actions';
import { uiActions } from '../../../redux/features/uiSlice';

const Section = styled.section`
  padding-top: 70px;
`;

// code
function FormDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.formId;

  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  useEffect(() => {
    dispatch(fetchFormData());
  }, []);

  useEffect(() => {
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm ? setForm(targetedForm) : router.push('/forms');
    }
  }, [formList]);

  const editFormHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, [router]);

  const removeFormHandler = useCallback(() => {
    const clickConfirmHandler = () => {
      dispatch(uiActions.closeModal());
      dispatch(removeFormData(formId));
      // 삭제되면 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
      dispatch(fetchFormData());
    };

    dispatch(
      uiActions.openModal(
        <Confirm
          text="폼을 삭제하시겠습니까?"
          onclickConfirm={clickConfirmHandler}
        />
      )
    );
  }, [dispatch]);

  return (
    <Section>
      <FormDetail
        form={form}
        onEdit={editFormHandler}
        onRemove={removeFormHandler}
      />
    </Section>
  );
}

export default FormDetailPage;
