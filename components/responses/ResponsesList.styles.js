import styled from 'styled-components';

export const ResponsesListStyled = styled.div`
  width: inherit;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .total-count {
      font-weight: bold;

      .number {
        color: ${props => props.theme.colorBlue0};
      }
    }
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

    td {
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
`;
