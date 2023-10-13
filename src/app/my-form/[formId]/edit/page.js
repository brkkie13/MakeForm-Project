'use client';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

// components
import Button from '../../../../../components/ui/button';
import HeaderType from '../../../../../components/create/form-type/header-type';
import ShortAnswerType from '../../../../../components/create/form-type/short-answer-type';
import LongAnswerType from '../../../../../components/create/form-type/long-answer-type';
import MultipleChoiceImageType from '../../../../../components/create/form-type/multiple-choice-image-type';
import MultipleChoiceTextType from '../../../../../components/create/form-type/multiple-choice-text-type';
import RatingType from '../../../../../components/create/form-type/rating-type';
import DescriptionType from '../../../../../components/create/form-type/description-type';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchFormData } from '@/redux/actions';

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
  console.log('editPage targetedForm =>', targetedForm);

  const onCancelHandler = useCallback(() => {
    const formDetailPagePath = `/my-form/${formId}`;
    router.push(formDetailPagePath);
  }, [dispatch]);

  if (!targetedForm) {
    return <span>로딩중...</span>;
  }

  return (
    <section>
      <HeaderType isEdit={isEditMode} targetedHeader={targetedForm.header} />
      {/* {targetedForm.items.map(item => (
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

      {/* {targetedForm.items.map(item => (
        <Fragment key={item.id}>
          {item.formType === 'multipleChoiceTextType' ? (
            <MultipleChoiceTextType />
          ) : null}
        </Fragment>
      ))} */}

      <div className="controls">
        <Button onClick={onCancelHandler}>취소</Button>
        <Button>등록</Button>
      </div>
    </section>
  );
}

export default EditPage;
