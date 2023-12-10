'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormDetail from '../../../components/forms/FormDetail';
import Confirm from '../../../components/modals/Confirm';
import Section from '../../../components/ui/Section';
import { SectionCard } from '../../../components/ui/SectionCard';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFormData,
  removeFormData,
} from '../../../redux/actions/formActionCreators';
import { uiActions } from '../../../redux/features/uiSlice';

// auth
import useFirebaseAuthState from '../../../utils/useFirebaseAuthState';

// code
function FormDetailPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const formId = params.formId;

  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  const user = useFirebaseAuthState();

  useEffect(() => {
    if (user) {
      dispatch(fetchFormData(user?.uid));
    }

    if (user === undefined) {
      router.push('/forms');
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm ? setForm(targetedForm) : router.push('/forms');
    }
  }, [formList, formId, router]);

  const editFormHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, [formId, router]);

  const removeFormHandler = useCallback(() => {
    const clickConfirmHandler = () => {
      dispatch(uiActions.closeModal());
      dispatch(removeFormData(formId));
      // 삭제되면 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
      dispatch(fetchFormData());
      router.push('/forms');
    };

    dispatch(
      uiActions.openModal(
        <Confirm
          text="폼을 삭제하시겠습니까?"
          onclickConfirm={clickConfirmHandler}
        />
      )
    );
  }, [dispatch, formId, router]);

  return (
    <Section>
      <SectionCard>
        <FormDetail
          formDetail={form}
          onEdit={editFormHandler}
          onRemove={removeFormHandler}
        />
      </SectionCard>
    </Section>
  );
}

export default FormDetailPage;
