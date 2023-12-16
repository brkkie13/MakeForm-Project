'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormDetail from '../../../components/forms/FormDetail';
import Confirm from '../../../components/modals/Confirm';
import Section from '../../../components/ui/Section';
import { SectionCard } from '../../../components/ui/SectionCard';
import { getDataFromLocalStorage } from '../../../utils/localStorage';
import { useLocalStorage } from '../../../utils/localStorage';

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
  const user = useFirebaseAuthState();
  const { setItem } = useLocalStorage();

  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  useEffect(() => {
    user && dispatch(fetchFormData(user?.uid));

    // 접근한 폼 id의 userId정보와 현재 로그인된 user.uid정보가 불일치하면 router.push('/forms')
  }, [dispatch, user]);

  useEffect(() => {
    if (formList.length > 0 && user) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm ? setForm(targetedForm) : router.push('/forms');
    }

    if (!user) {
      const storedForms = getDataFromLocalStorage();

      if (storedForms && storedForms.length > 0) {
        const targetedForm = storedForms.find(
          form => form.id === Number(formId)
        );

        targetedForm ? setForm(targetedForm) : router.push('/forms');
      }
    }
  }, [formList, formId, router, user]);

  const editFormHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, [formId, router]);

  const removeFormHandler = useCallback(() => {
    const clickConfirmHandler = () => {
      dispatch(uiActions.closeModal());

      // 삭제 로직
      user && dispatch(removeFormData(formId));
      if (!user) {
        const storedForms = getDataFromLocalStorage();
        const filteredForms = storedForms.filter(
          form => form.id !== Number(formId)
        );
        setItem('forms', JSON.stringify(filteredForms));
        dispatch(
          uiActions.showNotification({
            status: 'success',
            message: '삭제되었습니다',
          })
        );
      }

      // 삭제되면 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
      user && dispatch(fetchFormData());

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
