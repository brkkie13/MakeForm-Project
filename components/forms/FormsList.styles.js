import styled from 'styled-components';

export const Nav = styled.nav`
  margin: 20px 0;
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 15px;

  select,
  label {
    display: flex;
    background: ${props => props.theme.colors.block};
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0 10px;
  }

  svg {
    width: 23px;
    fill: lightgray;
    margin-right: 5px;
  }
`;

export const Table = styled.table`
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

  .controls span svg {
    width: 18px;
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
