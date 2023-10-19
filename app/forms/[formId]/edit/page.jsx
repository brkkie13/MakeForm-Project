'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import styled from 'styled-components';

// components
import Button from '../../../../components/ui/Button';
import HeaderType from '../../../../components/form-types/HeaderType';
import ShortAnswerType from '../../../../components/form-types/ShortAnswerType';
import LongAnswerType from '../../../../components/form-types/LongAnswerType';
import MultipleChoiceImageType from '../../../../components/form-types/MultipleChoiceImageType';
import MultipleChoiceTextType from '../../../../components/form-types/MultipleChoiceTextType';
import RatingType from '../../../../components/form-types/RatingType';
import DescriptionType from '../../../../components/form-types/DescriptionType';
import FormTypesToolbar from '../../../../components/form-types/FormTypesToolbar';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../../../redux/actions';
import { myFormActions } from '../../../../redux/features/myFormSlice';
import { sendEditedFormData } from '../../../../redux/actions';

// css
const Section = styled.section`
  .controls {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  .formBackground {
    padding-top: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

// code
function EditPage() {
  const router = useRouter();
  const params = useParams();
  const formId = params.formId;
  const dispatch = useDispatch();

  const formList = useSelector(state => state.myForm.formList);
  const targetedForm = useSelector(state => state.myForm.targetedForm);

  const editHeader = useSelector(state => state.myForm.editHeader);
  const editItems = useSelector(state => state.myForm.editItems);

  useEffect(() => {
    dispatch(fetchFormData());
    dispatch(myFormActions.findTargetedForm(formId));
    dispatch(myFormActions.setInitialEditValue());
  }, []);

  console.log('edit페이지 formList =>', formList);
  console.log('edit페이지 targetedForm =>', targetedForm);

  const onCancelHandler = useCallback(() => {
    router.push(`/forms/${formId}`);
  }, []);

  const saveFormHandler = () => {
    // 특정 폼을 수정할 땐 header필드, items필드만 수정.(creation필드, id필드는 유지)
    const editedData = {
      header: editHeader,
      items: editItems,
    };
    console.log(editedData);
    dispatch(sendEditedFormData(formId, editedData));
    router.push(`/forms/${formId}`);
  };

  return (
    <Section>
      <FormTypesToolbar />
      <div className="formBackground">
        <HeaderType
          // editHeader={targetedForm.header}
          isEdit={true}
        />

        {/* {targetedForm.items?.map(item => (
          <Fragment key={item.id}>
            {item.formType === 'shortAnswerType' ? (
              <ShortAnswerType />
            ) : item.formType === 'longAnswerType' ? (
              <LongAnswerType />
            ) : item.formType === 'multipleChoiceImageType' ? (
              <MultipleChoiceImageType />
            ) : item.formType === 'multipleChoiceTextType' ? (
              <MultipleChoiceTextType />
            ) : item.formType === 'ratingType' ? (
              <RatingType />
            ) : item.formType === 'descriptionType' ? (
              <DescriptionType />
            ) : null}
          </Fragment>
        ))} */}

        {targetedForm?.items?.map(item => (
          <Fragment key={item.id}>
            {item.formType === 'multipleChoiceTextType' ? (
              <MultipleChoiceTextType editItem={item} isEdit={true} />
            ) : null}
          </Fragment>
        ))}
      </div>
      <div className="controls">
        <Button onClick={onCancelHandler}>취소</Button>
        <Button onClick={saveFormHandler}>등록</Button>
      </div>
    </Section>
  );
}

export default EditPage;
