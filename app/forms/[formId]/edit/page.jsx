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
import { formActions } from '../../../../redux/features/formSlice';
import { updateFormData } from '../../../../redux/actions';

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

  const formList = useSelector(state => state.form.formList);
  const targetedForm = useSelector(state => state.form.targetedForm);
  const editHeader = useSelector(state => state.form.editHeader);
  const editItems = useSelector(state => state.form.editItems);

  useEffect(() => {
    dispatch(fetchFormData()); // 데이터 가져오기
    dispatch(formActions.findTargetedForm(formId)); // id와 일치하는 데이터 찾기
    dispatch(formActions.setInitialEditValue()); // 수정해야 할 값을 세팅
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
    dispatch(updateFormData(formId, editedData));
    router.push(`/forms/${formId}`);
  };

  return (
    <Section>
      <FormTypesToolbar />

      <div className="formBackground">
        <HeaderType isEdit={true} />

        {targetedForm?.items?.map(item => (
          <Fragment key={item.id}>
            {item.formType === 'shortAnswerType' ? (
              <ShortAnswerType editItem={item} />
            ) : item.formType === 'longAnswerType' ? (
              <LongAnswerType editItem={item} />
            ) : item.formType === 'multipleChoiceImageType' ? (
              <MultipleChoiceImageType editItem={item} />
            ) : item.formType === 'multipleChoiceTextType' ? (
              <MultipleChoiceTextType editItem={item} />
            ) : item.formType === 'ratingType' ? (
              <RatingType editItem={item} />
            ) : item.formType === 'descriptionType' ? (
              <DescriptionType editItem={item} />
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="controls">
        <Button onClick={onCancelHandler}>취소</Button>
        <Button onClick={saveFormHandler} primary="highlight">
          등록
        </Button>
      </div>
    </Section>
  );
}

export default EditPage;
