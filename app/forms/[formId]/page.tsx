'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';

import Detail from '@components/ui/Detail';
import Confirm from '@components/ui/Confirm';
import { Section, SectionCard } from '@components/ui/Section';
import { InvalidUrlBanner } from '@components/ui/NotificationBanner';
import { getDataFromLocalStorage } from '@utils/localStorage';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';

// redux
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/stores/store';
import {
  fetchFormData,
  removeFormData,
} from '@stores/actions/formActionCreators';
import { uiActions } from '@stores/features/uiSlice';

// types
import { FormDetail, FormState } from '@/types/types';

// code
function FormDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const formId = params.formId as string;
  const user = useFirebaseAuthState();

  const formList = useSelector((state: FormState) => state.form.formList);
  const [form, setForm] = useState<FormDetail>();

  useEffect(() => {
    // 로그인 되어있을 때, db에서 데이터 가져옴(formList에 값이 생김)
    if (user) {
      dispatch(fetchFormData(user.uid));
    }

    // 로그인 안되어 있을 때는 로컬스토리지에서 데이터를 가져옴
    if (!user) {
      const storedForms = getDataFromLocalStorage();

      if (storedForms && storedForms.length > 0) {
        const targetedForm = storedForms.find(
          (form: FormDetail) => form.id === formId
        );
        targetedForm && setForm(targetedForm);
      }
    }
  }, [user, dispatch]);

  useEffect(() => {
    // formList의 길이가 0보다 클 때, targetedForm을 찾음
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      // targetedForm의 타입은 CreatedData이지만 선택적프로퍼티 id로 인해 에러가 생기므로 우선 FormDetail로 단언.
      targetedForm && setForm(targetedForm as FormDetail);
    }
  }, [formList]);

  const editFormHandler = useCallback(() => {
    const editPagePath = `/forms/${formId}/edit`;
    router.push(editPagePath);
  }, [formId, router]);

  const removeFormHandler = useCallback(() => {
    const clickConfirmHandler = async () => {
      if (user) {
        dispatch(uiActions.closeModal());

        dispatch(await removeFormData(user, formId));
        // 삭제되면 바로 fetchFormData를 호출해 삭제가 반영된 새 formList를 가져옴.
        dispatch(fetchFormData(user.uid));

        router.replace('/forms');
      }
    };

    dispatch(
      uiActions.openModal(
        <Confirm
          text="폼을 삭제하시겠습니까?"
          onClickConfirm={clickConfirmHandler}
        />
      )
    );
  }, [dispatch, formId, router, user]);

  return (
    <Section>
      <SectionCard>
        {!form ? (
          <InvalidUrlBanner />
        ) : (
          <Detail
            formDetail={form}
            onEdit={editFormHandler}
            onRemove={removeFormHandler}
          />
        )}
      </SectionCard>
    </Section>
  );
}

export default FormDetailPage;
