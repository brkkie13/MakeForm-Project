import styled from 'styled-components';

export const FormListStyled = styled.table`
  width: 80%;
  border-collapse: collapse; //테두리 겹치기 해제
  border-spacing: 0; // 셀 사이의 간격 없애기

  td:nth-child(1) {
    width: 100px;
  }

  thead tr {
    border-bottom: 1px solid gray;
  }

  thead tr th {
    text-align: left;
    padding: 6px 0;
  }

  tr td:nth-child(1),
  tr th:nth-child(1) {
    width: 40%;
    padding-left: 10px;
  }

  tr td:nth-child(3) {
    padding-right: 10px;
  }

  tbody tr {
    border-bottom: 1px solid lightgray;
  }

  tbody tr td {
    padding: 10px 0;
  }

  tbody tr:hover {
    background-color: ${props => props.theme.colors.background};
    cursor: pointer;
  }

  .controls {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: flex-end;
  }

  .controls span {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .controls span:hover {
    background-color: gray;
    color: white;
  }
`;
