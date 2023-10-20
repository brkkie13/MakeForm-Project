import styled from 'styled-components';

export const StarsWrapper = styled.div`
  svg {
    fill: lightgray;
    cursor: pointer;
    width: 30px;
    height: 30px;
    transition: 0.2s ease-in-out;
  }

  // 부모div에 호버하면 별 svg 전체 다 노란색으로
  &:hover svg {
    fill: gold;
  }

  // 호버한 svg의 뒤에 위치한 형제 svg는 회색으로
  svg:hover ~ svg {
    fill: lightgray;
  }

  .active {
    fill: gold;
  }
`;
