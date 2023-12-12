import styled from 'styled-components';

export const FormListStyled = styled.table`
  table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
  width: 100%; // 제목 텍스트 초과분 생략 시 필요
  margin: 30px 0;
  border-collapse: collapse; // 테두리 겹치기 해제
  border-spacing: 0; // 셀 사이의 간격 없애기

  tr {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }

  tr:hover {
    background-color: ${props => props.theme.colors.background};
    cursor: pointer;
  }

  td {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .header {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date-and-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .date {
    color: gray;
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
  }
`;
