import styled from 'styled-components';

export const FormInputStyled = styled.textarea`
  overflow: hidden;
  width: 100%;
  height: 20px;
  line-height: 1.3;
  &::placeholder {
    color: ${props => props.theme.colorGrayLight};
  }
`;

export const HeaderInputStyled = styled(FormInputStyled)`
  font-size: 22px;
  height: 26px;
`;

export const TitleInputStyled = styled(FormInputStyled)`
  font-size: 19px;
  height: 22px;
  margin-bottom: 15px;
`;

export const ResponseInputStyled = styled(FormInputStyled)`
  height: 50px;
  border-bottom: 1px solid ${props => props.theme.colorGrayLight};
  padding: 15px;

  &:focus {
    border-bottom: 1px solid ${props => props.theme.colorBlue0};
  }
`;
