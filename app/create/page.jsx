'use client';

// components
import FormTypesToolbar from '../../components/form-types/FormTypesToolbar';
import FormTypes from '../../components/form-types/FormTypes';
import Button from '../../components/ui/Button';
import Section from '../../components/ui/Section';
import { useLocalStorage } from '../../utils/localStorage';

// redux
import { sendFormData } from '../../redux/actions/formActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// firebase auth
import useFirebaseAuthState from '../../utils/useFirebaseAuthState';
import { auth } from '../../firebase.config';

// code
function CreatePage() {
  const dispatch = useDispatch();
  const user = useFirebaseAuthState();
  const { setItem, getItem, removeItem } = useLocalStorage();
  // component 요소 예시: { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector(state => state.form.components);
  const header = useSelector(state => state.form.header);

  const addFormTypeHandler = formType => {
    dispatch(formActions.addComponent(formType));
  };

  const removeFormTypeHandler = idx => {
    dispatch(formActions.removeComponent(idx));
  };

  const saveFormHandler = () => {
    const data = {
      creationDate: new Date().toISOString(),
      header: header,
      items: components,
      // userId: auth?.currentUser?.uid,
    };

    if (auth?.currentUser?.uid) {
      data.userId = auth.currentUser.uid;
    }

    dispatch(sendFormData(user, data));
  };

  return (
    <Section>
      <FormTypesToolbar onAddFormType={addFormTypeHandler} />
      <FormTypes items={components} onRemoveFormType={removeFormTypeHandler} />
      <Button
        className="centered"
        primary="highlight"
        onClick={saveFormHandler}
      >
        저장
      </Button>
    </Section>
  );
}

export default CreatePage;
