'use client';
import React from 'react';

// components
import StarRating from '@components/ui/StarRating';
import { FormTitleInput } from '@components/ui/FormInputs';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';
import { useAppDispatch } from '@/stores/store';

// types
import { FormState } from '@/types/types';

type Props = {
  index: number;
  isEdit: boolean;
};

// code
function RatingType({ index, isEdit }: Props) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const components = useSelector((state: FormState) => state.form.components);
  const editItems = useSelector((state: FormState) => state.form.editItems);

  const changeTitleHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    dispatch(formActions.changeTitle({ index, newValue, isEdit: isEdit }));
  };

  return (
    <>
      <FormTitleInput
        value={isEdit ? editItems[index].title : components[index].title}
        onChange={changeTitleHandler}
        placeholder="질문 제목을 입력하세요"
      />
      <StarRating />
    </>
  );
}

export default RatingType;
