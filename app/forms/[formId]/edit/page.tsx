'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormTypesToolbar from '@components/form-types/FormTypesToolbar';
import FormTypes from '@components/form-types/FormTypes';
import { Section } from '@components/ui/Section';
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { getDataFromLocalStorage } from '@utils/localStorage';
import {
  OutlinedButtonStyled,
  FilledButtonStyled,
} from '@components/ui/Buttons';

// redux
import { useSelector } from 'react-redux';
import { fetchFormData } from '@stores/actions/formActionCreators';
import { formActions } from '@stores/features/formSlice';
import { updateFormData } from '@stores/actions/formActionCreators';
import { useAppDispatch } from '@/stores/store';
import { EditedData, FormState, LocalStorageData } from '@/types/types';

// code
function EditPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId as string;

  const dispatch = useAppDispatch();
  const user = useFirebaseAuthState();

  const formList = useSelector((state: FormState) => state.form.formList);
  const editHeader = useSelector((state: FormState) => state.form.editHeader);
  const editItems = useSelector((state: FormState) => state.form.editItems);

  useEffect(() => {
    // 로그인 되어있을 때, db에서 데이터 가져옴
    user && dispatch(fetchFormData(user.uid));

    // db에서 가져온 데이터 formList의 길이가 0보다 클 때, targetedForm을 찾음
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      targetedForm && dispatch(formActions.setInitialEditValue(targetedForm)); // edit페이지의 초기 input값을 세팅.
    }

    // 로그인 안되어 있을 때는 로컬스토리지에서 데이터를 가져옴
    if (!user) {
      const storedForms: LocalStorageData[] = getDataFromLocalStorage();

      if (storedForms && storedForms.length > 0) {
        const targetedForm = storedForms.find(form => form.id === formId);
        targetedForm && dispatch(formActions.setInitialEditValue(targetedForm));
      }
    }
  }, [formList, formId, dispatch, router]);

  const addFormTypeHandler = (formType: string) => {
    dispatch(formActions.addEditItem(formType));
  };

  const removeFormTypeHandler = (idx: number) => {
    dispatch(formActions.removeEditItem(idx));
  };

  const onCancelHandler = () => {
    router.push(`/forms/${formId}`);
  };

  const saveFormHandler = async () => {
    // 폼 수정 시 header,items필드만 수정 (creation,id필드는 유지)
    const editedData: EditedData = {
      header: editHeader,
      items: editItems,
    };

    try {
      await dispatch(updateFormData(user, formId, editedData));
      router.push(`/forms/${formId}`); // updateFormData에서 에러가 있으면 throw error로 에러를 발생시켜 해당 코드가 실행되지 않게 함.
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Section>
      <FormTypesToolbar onAddFormType={addFormTypeHandler} />

      <FormTypes
        items={editItems}
        onRemoveFormType={removeFormTypeHandler}
        isEdit={true}
      />

      <div className="controls centered">
        <OutlinedButtonStyled onClick={onCancelHandler}>
          취소
        </OutlinedButtonStyled>
        <FilledButtonStyled onClick={saveFormHandler}>수정</FilledButtonStyled>
      </div>
    </Section>
  );
}

export default EditPage;
