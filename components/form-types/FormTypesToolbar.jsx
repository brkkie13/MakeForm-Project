'use client';
import { Toolbar } from './FormTypesToolbar.styles';
import { Button } from '../ui/Button.styles';

// redux
import { formActions } from '../../redux/features/formSlice';
import { useDispatch } from 'react-redux';

function FormTypesToolbar() {
  const dispatch = useDispatch();

  const addComponentHandler = event => {
    const formType = event.target.value;
    dispatch(formActions.addComponent(formType));
  };

  return (
    <Toolbar>
      <button onClick={addComponentHandler} value="shortAnswerType">
        단답형
      </button>
      <button onClick={addComponentHandler} value="longAnswerType">
        장문형
      </button>
      <button onClick={addComponentHandler} value="multipleChoiceTextType">
        객관식(텍스트형)
      </button>
      <button onClick={addComponentHandler} value="multipleChoiceImageType">
        객관식(이미지형)
      </button>
      <button onClick={addComponentHandler} value="ratingType">
        평점
      </button>
      <button onClick={addComponentHandler} value="descriptionType">
        + 설명 추가
      </button>
    </Toolbar>
  );
}

export default FormTypesToolbar;
