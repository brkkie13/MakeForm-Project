'use client';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../../redux/features/formSlice';
import { myFormActions } from '../../redux/features/myFormSlice';

// components
import FormTypeCard from '../ui/FormTypeCard';
import { HeaderInputArea } from '../ui/InputArea';

// code
function HeaderType({ isEdit }) {
  const dispatch = useDispatch();

  // '/[formId]/edit'페이지에서 'editingHeader'를 전달 받았을 때 실행
  if (isEdit) {
    const editHeader = useSelector(state => state.myForm.editHeader);

    const changeHeaderHandler = event => {
      const newValue = event.target.value;
      dispatch(myFormActions.changeHeader(newValue));
    };

    return (
      <FormTypeCard>
        <HeaderInputArea
          value={editHeader}
          onChange={changeHeaderHandler}
          placeholder="폼 주제"
        />
      </FormTypeCard>
    );
  }

  // '/create'페이지에서
  const header = useSelector(state => state.form.header); // 기존에 저장된 헤더값 가져옴.

  const changeHeaderHandler = event => {
    const newValue = event.target.value;
    dispatch(formActions.changeHeader(newValue));
  };

  return (
    <FormTypeCard>
      <HeaderInputArea
        value={header}
        onChange={changeHeaderHandler}
        placeholder="폼 주제를 입력하세요"
      />
    </FormTypeCard>
  );
}

export default HeaderType;
