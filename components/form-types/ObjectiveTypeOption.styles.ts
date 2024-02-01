import styled from 'styled-components';

// 옵션들을 그룹으로 묶어 그리드 배열.
export const ObjectiveTypeOptionsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  gap: 20px;
  margin: 0px 10px;

  // 옵션 삭제버튼과 관련
  .option {
    position: relative;
  }

  @media (max-width: ${props => props.theme.mobileWidth}) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

export const ObjectiveTypeOptionStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: ${props => props.theme.radiusSmall};
  border: 1px solid ${props => props.theme.colorGrayLightest};

  // 화면 너비를 줄이면 input이 부모에 맞춰짐
  input {
    width: 100%;
  }

  input::placeholder {
    color: ${props => props.theme.colorGrayLightest};
  }

  // 라디오버튼을 숨김
  [type='radio'] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 30px;
  }

  // 원 테두리와 원 가운데
  label::after,
  label::before {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  // 원 테두리
  label::after {
    height: 16px;
    width: 16px;
    border: 2px solid ${props => props.theme.colorGrayLightest};
    left: 0px;
    top: calc(50% - 10px);
  }

  // 원 가운데
  label::before {
    background-color: ${props => props.theme.colorBlue0};
    height: 10px;
    width: 10px;
    left: 5px;
    top: calc(50% - 5px);
    visibility: hidden;
  }

  // 라디오버튼이 선택되면 원 테두리가 파란색으로 바뀜
  [type='radio']:checked ~ label::after {
    border-color: ${props => props.theme.colorBlue0};
  }

  // 라디오버튼이 선택되면 원 가운데가 숨겨졌던 게 보임
  [type='radio']:checked ~ label::before {
    visibility: visible;
  }
`;
