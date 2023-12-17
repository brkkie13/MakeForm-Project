import styled from 'styled-components';

export const FormListStyled = styled.table`
  table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
  width: 100%; // 제목 텍스트 초과분 생략 시 필요
  margin: 30px 0;
  border-collapse: collapse; // 테두리 겹치기 해제
  border-spacing: 0; // 셀 사이의 간격 없애기

  thead > tr > td {
    padding-bottom: 6px;

    .number {
      font-weight: bold;
      color: ${props => props.theme.colors.pointSkyblue};
    }
  }

  tbody > tr {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
  }

  tbody > tr:first-child {
    border-top: 2px solid lightgray;
  }

  tbody > tr:last-child {
    border-bottom: 2px solid lightgray;
  }

  tbody > tr:hover {
    background-color: ${props => props.theme.colors.background};
    cursor: pointer;
  }

  tbody > tr > td {
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

export const EmptyListStyled = styled.article`
  margin: 30px 0;
  padding: 80px 0;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  & > svg {
    width: 90px;
    height: 90px;
    fill: lightgray;
  }

  .main-text {
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
  }

  .sub-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 3px;
    white-space: nowrap;
  }

  .create-form-button {
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: ${props => props.theme.colors.activeMenu};
    padding: 5px;
    border-radius: 5px;
    white-space: nowrap;
  }
`;
