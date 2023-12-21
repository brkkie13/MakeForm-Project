import styled from 'styled-components';

export const Label = styled.label`
  position: relative;
  width: 56px;
  height: 30px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: ${props => props.theme.colorGrayLightest};
    border-radius: 50px;
    display: flex;
    align-items: center;
  }

  span:before {
    position: absolute;
    content: '';
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background: ${props => props.theme.colorBackground0};
    left: 4px;
    bottom: 4px;
    transition: 0.3s;
  }

  input:checked + span {
    background: ${props => props.theme.colorGold};
    transition: 0.3s;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }

  // 스위치 안의 다크모드&라이트모드 아이콘 관련 css
  div {
    display: flex;
    padding: 6px;
  }
  .align-right {
    position: absolute;
    right: 0;
  }
`;
