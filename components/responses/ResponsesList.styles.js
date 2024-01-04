import styled from 'styled-components';

export const ResponsesListStyled = styled.div`
  width: inherit;

  .total-count {
    font-weight: bold;
    margin-bottom: 20px;

    .number {
      color: ${props => props.theme.colorBlue0};
    }
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TableWrapper = styled.div`
  width: inherit;
  max-height: 400px;
  overflow: scroll;

  // 스크롤바 스타일
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: ${props => props.theme.radiusMax};
    background: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorBlue0};
    border-radius: ${props => props.theme.radiusMax};
  }

  table {
    table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
    border-collapse: collapse;
    border-spacing: 0; // 셀 사이의 간격 없애기
    white-space: nowrap; // 글자 세로에서 가로로 배열
    margin-bottom: 10px; // 스크롤로 가려지는 부분 여백
    margin-right: 10px; // 스크롤로 가려지는 부분 여백
  }

  thead tr {
    background: ${props => props.theme.colorBackground1};
  }

  tbody tr {
    border-bottom: 1px solid ${props => props.theme.colorGrayLightest};
  }

  tbody tr:hover {
    cursor: pointer;

    .responses-id,
    .date,
    .header,
    .title-text,
    .response-text {
      text-decoration: underline;
    }
  }

  td {
    padding: 10px 25px;
  }

  thead td {
    color: ${props => props.theme.colorGrayHeavy};
    border-right: 1px solid ${props => props.theme.colorGrayLightest};
  }
  thead td:last-child {
    border-right: none;
  }

  .responses-id {
    color: ${props => props.theme.colorBlue0};
  }

  .response-data {
    display: flex;
    align-items: center;

    .form-type,
    .response {
      font-size: 12px;
      color: ${props => props.theme.colorGrayLight};
      border: 1px solid ${props => props.theme.colorGrayLight};
      padding: 2px 4px;
      margin-right: 5px;
    }

    .title-text,
    .response-text {
      margin-right: 10px;
    }
  }
`;
