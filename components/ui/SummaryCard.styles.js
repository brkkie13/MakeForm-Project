import styled from 'styled-components';

export const SummaryCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  gap: 60px;

  border-radius: ${props => props.theme.radiusMedium};
  background: ${props => props.theme.colorBackground0};
  box-shadow: ${props => props.theme.shadow};

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      stroke: ${props => props.theme.colorGrayLightest};
    }
  }

  .count {
    display: flex;
    justify-content: end;
    align-items: baseline;
  }

  .count-badge {
    font-size: 12px;
    font-weight: bold;
    color: ${props => props.theme.colorRed};
    border: 1px solid ${props => props.theme.colorRed};
    border-radius: ${props => props.theme.radiusMax};
    padding: 2px 8px;
    margin-right: 7px;
  }

  .count-number {
    font-size: 27px;
    font-weight: bold;
  }
`;
