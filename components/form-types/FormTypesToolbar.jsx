'use client';
import { ToolbarStyled } from './FormTypesToolbar.styles';

function FormTypesToolbar({ onAddFormType }) {
  return (
    <ToolbarStyled>
      <button
        onClick={e => onAddFormType(e.target.value)}
        value="shortAnswerType"
      >
        단답형
      </button>
      <button
        onClick={e => onAddFormType(e.target.value)}
        value="longAnswerType"
      >
        장문형
      </button>
      <button
        onClick={e => onAddFormType(e.target.value)}
        value="multipleChoiceTextType"
      >
        객관식(텍스트형)
      </button>
      <button
        onClick={e => onAddFormType(e.target.value)}
        value="multipleChoiceImageType"
      >
        객관식(이미지형)
      </button>
      <button onClick={e => onAddFormType(e.target.value)} value="ratingType">
        평점
      </button>
      <button
        onClick={e => onAddFormType(e.target.value)}
        value="descriptionType"
      >
        + 설명 추가
      </button>
    </ToolbarStyled>
  );
}

export default FormTypesToolbar;
