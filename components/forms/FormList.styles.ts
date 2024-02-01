import styled from 'styled-components';

export const FormListStyled = styled.div`
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
  table {
    table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
    width: 100%; // 제목 텍스트 초과분 생략 시 필요
    border-collapse: collapse; // 테두리 겹치기 해제
    border-spacing: 0; // 셀 사이의 간격 없애기
    white-space: nowrap; // 글자 세로에서 가로로 배열
  }

  tbody > tr {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${props => props.theme.colorGrayLightest};
  }

  tbody > tr:first-child {
    border-top: 1px solid ${props => props.theme.colorGrayLightest};
  }

  tbody > tr:hover {
    cursor: pointer;

    .header {
      text-decoration: underline;
    }
  }

  tbody > tr > td {
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .header {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date-and-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .date {
    color: ${props => props.theme.colorGrayLightest};
  }

  .controls {
    display: flex;
    gap: 25px;
    align-items: center;
  }

  // 가로줄 기준으로 안쪽으로 들어가있는 텍스트 여백 없애기
  @media (max-width: ${props => props.theme.mobileWidth}) {
    tbody > tr > td {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
`;
