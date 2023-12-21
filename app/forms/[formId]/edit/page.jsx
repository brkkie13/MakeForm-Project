'use client';
import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import FormTypesToolbar from '../../../../components/form-types/FormTypesToolbar';
import FormTypes from '../../../../components/form-types/FormTypes';
import Section from '../../../../components/ui/Section';
import useFirebaseAuthState from '../../../../utils/useFirebaseAuthState';
import { getDataFromLocalStorage } from '../../../../utils/localStorage';
import {
  OutlinedButtonStyled,
  FilledButtonStyled,
} from '../../../../components/ui/Buttons';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../../../redux/actions/formActionCreators';
import { formActions } from '../../../../redux/features/formSlice';
import { updateFormData } from '../../../../redux/actions/formActionCreators';

// code
function EditPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId;
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();

  const formList = useSelector(state => state.form.formList);
  const editHeader = useSelector(state => state.form.editHeader);
  const editItems = useSelector(state => state.form.editItems);

  useEffect(() => {
    user && dispatch(fetchFormData());
  }, [dispatch]);

  useEffect(() => {
    if (formList.length > 0 && user) {
      const targetedForm = formList.find(form => form.id === formId);

      targetedForm
        ? dispatch(formActions.setInitialEditValue(targetedForm)) // edit페이지의 초기 input값을 세팅.
        : router.push('/forms');
    }

    if (!user) {
      const storedForms = getDataFromLocalStorage();

      if (storedForms && storedForms.length > 0) {
        const targetedForm = storedForms.find(form => form.id === formId);

        targetedForm
          ? dispatch(formActions.setInitialEditValue(targetedForm))
          : router.push('/forms');
      }
    }
  }, [formList, formId, dispatch, router]);

  const addFormTypeHandler = formType => {
    dispatch(formActions.addEditItem(formType));
  };

  const removeFormTypeHandler = idx => {
    dispatch(formActions.removeEditItem(idx));
  };

  const onCancelHandler = () => {
    router.push(`/forms/${formId}`);
  };

  const saveFormHandler = () => {
    // 폼 수정 시 header,items필드만 수정 (creation,id필드는 유지)
    const editedData = {
      header: editHeader,
      items: editItems,
    };

    dispatch(updateFormData(user, formId, editedData));
    router.push(`/forms/${formId}`);
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
