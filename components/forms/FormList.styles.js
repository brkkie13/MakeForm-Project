import styled from 'styled-components';

export const FormListStyled = styled.div`
  table {
    table-layout: fixed; // 제목 텍스트 초과분 생략 시 필요
    width: 100%; // 제목 텍스트 초과분 생략 시 필요
    border-collapse: collapse; // 테두리 겹치기 해제
    border-spacing: 0; // 셀 사이의 간격 없애기
  }

  thead > tr > td {
    padding-bottom: 20px;
    font-size: 18px;
    font-weight: 600;

    .number {
      font-size: 18px;
      font-weight: 600;
      color: ${props => props.theme.colorBlue0};
    }
  }

  tbody > tr {
    border-bottom: 1px solid ${props => props.theme.colorGrayLightest};
  }

  tbody > tr:last-child {
    border-bottom: none;
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
    color: ${props => props.theme.colorGrayLightest};
  }

  .controls {
    display: flex;
    gap: 25px;
    align-items: center;
  }

  @media (max-width: ${props => props.theme.mobileWidth}) {
    tbody > tr > td {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
`;
