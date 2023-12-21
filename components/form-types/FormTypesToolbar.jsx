'use client';
import { ToolbarStyled } from './FormTypesToolbar.styles';
import { RoundedButtonStyled } from '../ui/Buttons';

function FormTypesToolbar({ onAddFormType }) {
  return (
    <ToolbarStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="shortAnswerType"
      >
        단답형
      </RoundedButtonStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="longAnswerType"
      >
        장문형
      </RoundedButtonStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="multipleChoiceTextType"
      >
        객관식(텍스트형)
      </RoundedButtonStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="multipleChoiceImageType"
      >
        객관식(이미지형)
      </RoundedButtonStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="ratingType"
      >
        평점
      </RoundedButtonStyled>
      <RoundedButtonStyled
        onClick={e => onAddFormType(e.target.value)}
        value="descriptionType"
      >
        + 설명 추가
      </RoundedButtonStyled>
    </ToolbarStyled>
  );
}

export default FormTypesToolbar;
