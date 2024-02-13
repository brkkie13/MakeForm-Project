'use client';
import React from 'react';
import { FormTitleInput } from '@components/ui/FormInputs';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';

// types
import { FormState } from '@/types/types';

type Props = {
  index: number;
  isEdit: boolean;
};

// code
function SubjectiveType({ index, isEdit }: Props) {
  const dispatch = useDispatch();
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
      <p>주관식 답변</p>
    </>
  );
}

export default SubjectiveType;
