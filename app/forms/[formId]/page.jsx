'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormDetail from '../../../components/forms/FormDetail';
import Confirm from '../../../components/modals/Confirm';
import Section from '../../../components/ui/Section';
import { SectionCard } from '../../../components/ui/SectionCard';
import { getDataFromLocalStorage } from '../../../utils/localStorage';

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

  const formList = useSelector(state => state.form.formList);
  const [form, setForm] = useState({});

  useEffect(() => {
    // 로그인 되어있을 때, db에서 데이터 가져옴
    user && dispatch(fetchFormData(user?.uid));

    // db에서 가져온 데이터 formList의 길이가 0보다 클 때, targetedForm을 찾음
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm && setForm(targetedForm);
    }

    // 로그인 안되어 있을 때는 로컬스토리지에서 데이터를 가져옴
    if (!user) {
      const storedForms = getDataFromLocalStorage();

      if (storedForms && storedForms.length > 0) {
        const targetedForm = storedForms.find(form => form.id === formId);
        targetedForm && setForm(targetedForm);
      }
    }
  }, [formList, user, dispatch]);

  const editFormHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, [formId, router]);

  const removeFormHandler = useCallback(() => {
    const clickConfirmHandler = () => {
      dispatch(uiActions.closeModal());
      dispatch(removeFormData(user, formId));
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
