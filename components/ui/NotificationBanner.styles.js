import styled from 'styled-components';

export const NotificationBannerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;

  & > svg {
    width: 90px;
    height: 90px;
    fill: ${props => props.theme.colorGrayLightest};
    fill: ${props => props.theme.colorBlue0};
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

  .button {
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
