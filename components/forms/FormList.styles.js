import styled from 'styled-components';

export const FormListStyled = styled.div`
  background: ${props => props.theme.colorBackground0};
  box-shadow: ${props => props.theme.shadow};
  border-radius: ${props => props.theme.radiusLarge};
  margin: 30px 0;
  padding: 40px 30px;

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

export const EmptyListStyled = styled.article`
  margin: 30px 0;
  padding: 80px 0;
  background: ${props => props.theme.colorBackground0};
  border-radius: ${props => props.theme.radiusLarge};
  box-shadow: ${props => props.theme.shadow};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  & > svg {
    width: 90px;
    height: 90px;
    fill: ${props => props.theme.colorGrayLightest};
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
    background: ${props => props.theme.colorBackground1};
    color: ${props => props.theme.colorBlue0};
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 7px;
    border-radius: ${props => props.theme.radiusSmall};
    white-space: nowrap;

    svg {
      fill: ${props => props.theme.colorBlue0};
    }
  }
`;
