'use client';

// components
import { FormInput } from '@/components/ui/FormInputs';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '@stores/features/formSlice';

// code
function DescriptionType({ index, isEdit }) {
  const dispatch = useDispatch();
  const components = useSelector(state => state.form.components);
  const editItems = useSelector(state => state.form.editItems);

  const changeDescriptionHandler = event => {
    const newValue = event.target.value;
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
