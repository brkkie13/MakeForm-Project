'use client';
import React from 'react';
import FormTypesToolbar from '@components/form-types/FormTypesToolbar';
import FormTypes from '@components/form-types/FormTypes';
import { Section } from '@components/ui/Section';
import { FilledButtonStyled } from '@components/ui/Buttons';
import { getItem } from '@utils/localStorage';

// redux
import { sendFormData } from '@stores/actions/formActionCreators';
import { useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';
import { useAppDispatch } from '@/stores/store';

// firebase auth
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { auth } from '@/firebase.config';

// types
import { CreatedData } from '@/types/types';
import { FormState } from '@/types/types';

// code
function CreatePage() {
  const dispatch = useAppDispatch();
  const user = useFirebaseAuthState();

  // component 요소 예시: { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector((state: FormState) => state.form.components);
  const header = useSelector((state: FormState) => state.form.header);
  let dataId = getItem('dataId') || 'localData0';

  const addFormTypeHandler = (formType: string) => {
    dispatch(formActions.addComponent(formType));
  };

  const removeFormTypeHandler = (idx: number) => {
    dispatch(formActions.removeComponent(idx));
  };

  const saveFormHandler = async () => {
    const data: CreatedData = {
      creationDate: new Date(),
      header: header,
      items: components,
    };

    if (user && auth.currentUser) data.userId = auth.currentUser.uid;
    if (!user) data.id = dataId;

    await dispatch(sendFormData(user, data));
  };

  return (
    <Section>
      <FormTypesToolbar onAddFormType={addFormTypeHandler} />
      <FormTypes items={components} onRemoveFormType={removeFormTypeHandler} />
      <FilledButtonStyled className="centered" onClick={saveFormHandler}>
        저장
      </FilledButtonStyled>
    </Section>
  );
}

export default CreatePage;
