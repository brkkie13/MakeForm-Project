'use client';

// components
import FormTypesToolbar from '@components/form-types/FormTypesToolbar';
import FormTypes from '@components/form-types/FormTypes';
import { Section } from '@components/ui/Section';
import { FilledButtonStyled } from '@components/ui/Buttons';

// redux
import { sendFormData } from '@stores/actions/formActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';
import { useLocalStorage } from '@utils/localStorage';

// firebase auth
import useFirebaseAuthState from '@utils/useFirebaseAuthState';
import { auth } from '@/firebase.config';

// code
function CreatePage() {
  const { getItem, setItem } = useLocalStorage();
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();

  // component 요소 예시: { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector(state => state.form.components);
  const header = useSelector(state => state.form.header);
  let dataId = getItem('dataId') || 'localData0';

  const addFormTypeHandler = formType => {
    dispatch(formActions.addComponent(formType));
  };

  const removeFormTypeHandler = idx => {
    dispatch(formActions.removeComponent(idx));
  };

  const saveFormHandler = async () => {
    const data = {
      creationDate: new Date().toISOString(),
      header: header,
      items: components,
    };

    user && (data.userId = auth.currentUser.uid);
    !user && (data.id = dataId);

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
