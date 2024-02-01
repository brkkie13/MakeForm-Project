'use client';

// components
import { FormInput } from '@/components/ui/FormInputs';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';
import { useAppDispatch } from '@/stores/store';
import { FormState } from '@/types/types';

type Props = {
  index: number;
  isEdit: boolean;
};

// code
function DescriptionType({ index, isEdit }: Props) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const components = useSelector((state: FormState) => state.form.components);
  const editItems = useSelector((state: FormState) => state.form.editItems);

  const changeDescriptionHandler = (
    event: React.FormEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.currentTarget.value;
    dispatch(
      formActions.changeDescription({ index, newValue, isEdit: isEdit })
    );
  };

  return (
    <FormInput
      value={
        isEdit ? editItems[index].description : components[index].description
      }
      onChange={changeDescriptionHandler}
      placeholder="설명을 입력하세요"
    />
  );
}

export default DescriptionType;
