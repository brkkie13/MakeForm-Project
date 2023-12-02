'use client';
import styled from 'styled-components';

// components
import FormTypesToolbar from '../../components/form-types/FormTypesToolbar';
import FormTypes from '../../components/form-types/FormTypes';
import Button from '../../components/ui/Button';

// redux
import { sendFormData } from '../../redux/actions/formActionCreators';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';

// firebase auth
import { auth } from '../../firebase.config';

// css
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// code
function CreatePage() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);
  // component 예시: { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  // components: component 객체가 모인 배열
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
      userId: auth?.currentUser?.uid,
    };
    dispatch(sendFormData(data));
  };

  return (
    <Section>
      <FormTypesToolbar onAddFormType={addFormTypeHandler} />
      <FormTypes items={components} onRemoveFormType={removeFormTypeHandler} />
      <Button primary="highlight" onClick={saveFormHandler}>
        저장
      </Button>
    </Section>
  );
}

export default CreatePage;
