import styled from 'styled-components';

// 기본 본문 textarea
export const Textarea = styled.textarea`
  overflow: hidden;
  width: 100%;
  height: 20px;
  line-height: 1.3;
  &::placeholder {
    color: ${props => props.theme.colorGrayLight};
  }
`;

// 헤더 textarea
export const HeaderTextarea = styled(Textarea)`
  font-size: 22px;
  height: 26px;
`;

// 제목 textarea
export const TitleTextarea = styled(Textarea)`
  font-size: 19px;
  height: 22px;
  margin-bottom: 15px;
`;

export const AuthInputStyled = styled.div`
  margin-bottom: 20px;

  .input-container {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  input {
    padding: 10px;
    border: 1px solid ${props => props.theme.colorGrayLightest};
    border-radius: 5px;
    transition: border-color 0.3s;
    padding-right: 40px;
    width: 100%;
  }

  input:focus {
    border-color: ${props => props.theme.colorBlue0};
  }

  input.invalid {
    border-color: ${props => props.theme.colorRed};
  }

  .validation-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
  }

  .validation-icon > .valid {
    fill: ${props => props.theme.colorBlue0};
  }

  .validation-icon > .invalid {
    fill: ${props => props.theme.colorRed};
  }

  .caution {
    display: flex;
    font-size: 13px;
    color: ${props => props.theme.colorRed};
    margin-top: 5px;

    svg {
      fill: ${props => props.theme.colorRed};
      margin-right: 3px;
    }
  }

  .hide {
    display: none;
  }
`;
