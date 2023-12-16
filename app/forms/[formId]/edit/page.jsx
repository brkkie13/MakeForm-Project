'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';

// components
import Button from '../../../../components/ui/Button';
import FormTypesToolbar from '../../../../components/form-types/FormTypesToolbar';
import FormTypes from '../../../../components/form-types/FormTypes';
import Section from '../../../../components/ui/Section';
import useFirebaseAuthState from '../../../../utils/useFirebaseAuthState';
import { getDataFromLocalStorage } from '../../../../utils/localStorage';
import { useLocalStorage } from '../../../../utils/localStorage';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../../../redux/actions/formActionCreators';
import { formActions } from '../../../../redux/features/formSlice';
import { updateFormData } from '../../../../redux/actions/formActionCreators';
import { uiActions } from '../../../../redux/features/uiSlice';

// code
function EditPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId;
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();
  const { setItem } = useLocalStorage();

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
        const targetedForm = storedForms.find(
          form => form.id === Number(formId)
        );

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

    user && dispatch(updateFormData(formId, editedData));
    if (!user) {
      const storedForms = getDataFromLocalStorage();
      const editedForms = storedForms.map(form =>
        form.id === Number(formId)
          ? { ...form, header: editHeader, items: editItems }
          : form
      );

      setItem('forms', JSON.stringify(editedForms));
      dispatch(
        uiActions.showNotification({
          status: 'success',
          message: '수정되었습니다',
        })
      );
    }

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
        <Button onClick={onCancelHandler}>취소</Button>
        <Button onClick={saveFormHandler} primary="highlight">
          등록
        </Button>
      </div>
    </Section>
  );
}

export default EditPage;
