import styled from 'styled-components';

export const StarsStyled = styled.div`
  svg {
    margin-right: 4px;
    fill: ${props => props.theme.colorGrayLightest};
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  // 부모div에 호버하면 별 svg 전체 다 노란색으로
  &:hover svg {
    fill: ${props => props.theme.colorGold};
  }

  // 호버한 svg의 뒤에 위치한 형제 svg는 회색으로
  svg:hover ~ svg {
    fill: ${props => props.theme.colorGrayLightest};
  }

  .active {
    fill: ${props => props.theme.colorGold};
  }
`;
