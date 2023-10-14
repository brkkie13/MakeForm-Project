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

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '../../../../redux/actions';

// css
const Section = styled.section`
  margin: 0;
  background: ${props => props.theme.colors.background2};

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

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchFormData());
    setIsEditMode(true);
  }, []);

  const targetedForm = formList.find(form => form.id === formId);
  console.log('edit페이지 formList =>', formList);
  console.log('edit페이지 targetedForm =>', targetedForm);

  const onCancelHandler = useCallback(() => {
    const formDetailPagePath = `/forms/${formId}`;
    router.push(formDetailPagePath);
  }, []);

  if (!targetedForm) {
    return <span>로딩중...</span>;
  }

  return (
    <Section>
      <div className="formBackground">
        <HeaderType isEdit={isEditMode} targetedHeader={targetedForm.header} />

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

        {/* {targetedForm.items?.map(item => (
          <Fragment key={item.id}>
            {item.formType === 'multipleChoiceTextType' ? (
              <MultipleChoiceTextType item={item} />
            ) : null}
          </Fragment>
        ))} */}
      </div>
      <div className="controls">
        <Button onClick={onCancelHandler}>취소</Button>
        <Button>등록</Button>
      </div>
    </Section>
  );
}

export default EditPage;
