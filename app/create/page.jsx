'use client';
import styled from 'styled-components';
import { Fragment } from 'react';

// components
import Button from '../../components/ui/Button';
import ShortAnswerType from '../../components/form-types/ShortAnswerType';
import LongAnswerType from '../../components/form-types/LongAnswerType';
import MultipleChoiceImageType from '../../components/form-types/MultipleChoiceImageType';
import MultipleChoiceTextType from '../../components/form-types/MultipleChoiceTextType';
import RatingType from '../../components/form-types/RatingType';
import HeaderType from '../../components/form-types/HeaderType';
import DescriptionType from '../../components/form-types/DescriptionType';
import FormTypesToolbar from '../../components/form-types/FormTypesToolbar';
import Notification from '../../components/ui/Notification';

// redux
import { sendFormData } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import { uiActions } from '../../redux/features/uiSlice';
import FormTypeCard from '../../components/ui/FormTypeCard';

// css
const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormContents = styled.div`
  padding-top: 110px;
`;

// code
function CreatePage() {
  const dispatch = useDispatch();

  // component 예시:
  // { formType: 'multipleChoiceType', id: 0, title: '~~', options: [ {text: '~~'}, { text: '~~'} ] }
  const components = useSelector(state => state.form.components);
  const header = useSelector(state => state.form.header);
  const notification = useSelector(state => state.ui.notification);

  // 최종으로 '저장'버튼을 눌렀을 때 실행 (db에 저장됨)
  const saveFormHandler = () => {
    const data = {
      creationDate: new Date().toISOString(),
      header: header,
      items: components,
    };
    console.log(data);
    dispatch(sendFormData(data));
  };

  const removeFormTypeHandler = idx => {
    dispatch(formActions.removeComponent(idx));
  };

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          message={notification.message}
        />
      )}
      <Section>
        <FormTypesToolbar />
        <FormContents>
          <FormTypeCard content={<HeaderType />} isHeader={true} />
          {components.map((component, idx) => (
            <Fragment key={component.id}>
              {
                <FormTypeCard
                  onRemoveFormType={() => removeFormTypeHandler(idx)}
                  content={
                    component.formType === 'shortAnswerType' ? (
                      <ShortAnswerType index={idx} />
                    ) : component.formType === 'longAnswerType' ? (
                      <LongAnswerType index={idx} />
                    ) : component.formType === 'multipleChoiceImageType' ? (
                      <MultipleChoiceImageType index={idx} />
                    ) : component.formType === 'multipleChoiceTextType' ? (
                      <MultipleChoiceTextType index={idx} />
                    ) : component.formType === 'ratingType' ? (
                      <RatingType index={idx} />
                    ) : component.formType === 'descriptionType' ? (
                      <DescriptionType index={idx} />
                    ) : null
                  }
                />
              }
            </Fragment>
          ))}
        </FormContents>
        <Button primary="highlight" onClick={saveFormHandler}>
          저장
        </Button>
      </Section>
    </>
  );
}

export default CreatePage;
