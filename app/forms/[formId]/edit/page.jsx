'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';

// components
import Button from '../../../../components/ui/Button';
import FormTypesToolbar from '../../../../components/form-types/FormTypesToolbar';
import FormTypes from '../../../../components/form-types/FormTypes';
import Section from '../../../../components/ui/Section';

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

  const formList = useSelector(state => state.form.formList);
  const editHeader = useSelector(state => state.form.editHeader);
  const editItems = useSelector(state => state.form.editItems);

  useEffect(() => {
    dispatch(fetchFormData());
  }, [dispatch]);

  useEffect(() => {
    if (formList.length > 0) {
      const targetedForm = formList.find(form => form.id === formId);
      if (targetedForm) {
        // edit페이지의 초기 input값을 세팅.
        dispatch(formActions.setInitialEditValue(targetedForm));
      } else {
        router.push('/forms');
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
    dispatch(updateFormData(formId, editedData));
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
