'use client';

// components
import { FormHeaderInput } from '@components/ui/FormInputs';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';
import { useAppDispatch } from '@/stores/store';

// types
import { FormState } from '@/types/types';

type Props = {
  isEdit: boolean;
};

// code
function HeaderType({ isEdit }: Props) {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const header = useSelector((state: FormState) => state.form.header); // 기존에 저장된 헤더값 가져옴.
  const editHeader = useSelector((state: FormState) => state.form.editHeader);

  const changeHeaderHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    dispatch(
      formActions.changeHeader(
        isEdit ? { newValue, isEdit: true } : { newValue, isEdit: false }
      )
    );
  };

  return (
    <FormHeaderInput
      value={isEdit ? editHeader : header}
      onChange={changeHeaderHandler}
      placeholder="폼 주제를 입력하세요"
    />
  );
}

export default HeaderType;
