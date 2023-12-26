import styled from 'styled-components';

// 기본 본문 textarea
export const FormInputStyled = styled.textarea`
  overflow: hidden;
  width: 100%;
  height: 20px;
  line-height: 1.3;
  &::placeholder {
    color: ${props => props.theme.colorGrayLight};
  }
`;

// 헤더 textarea
export const HeaderFormInputStyled = styled(FormInputStyled)`
  font-size: 22px;
  height: 26px;
`;

// 제목 textarea
export const TitleFormInputStyled = styled(FormInputStyled)`
  font-size: 19px;
  height: 22px;
  margin-bottom: 15px;
`;
