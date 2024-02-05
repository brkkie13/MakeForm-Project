import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const ResponsesListStyled = styled.div<Props>`
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

export const TableWrapper = styled.div<Props>`
  width: inherit;
  overflow-x: scroll; // 가로 스크롤만 표시

  // 스크롤바 스타일
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: ${props => props.theme.radius.max};
    background: lightgray;
  }
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colorBlue0};
    border-radius: ${props => props.theme.radius.max};
  }

  table {
    table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
    border-collapse: collapse;
    border-spacing: 0; // 셀 사이의 간격 없애기
    white-space: nowrap; // 글자 세로에서 가로로 배열
    margin-bottom: 10px; // 스크롤로 가려지는 부분 여백
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
