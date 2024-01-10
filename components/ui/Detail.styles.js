import styled from 'styled-components';

export const DetailStyled = styled.article`
  display: flex;
  flex-direction: column;
  gap: 50px;

  .controls {
    display: flex;
    gap: 25px;
    align-items: center;
    justify-content: flex-end;
  }

  h1 {
    margin-bottom: 30px;
  }

  .submit-button {
    display: flex;
    justify-content: flex-end;
  }
`;

export const FormItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  .title {
    margin-bottom: 20px;
  }

  .placeholder-text {
    color: ${props => props.theme.colorGrayLight};
  }

  .response-detail {
    display: flex;
    align-items: center;

    .form-type {
      color: ${props => props.theme.colorGrayLightest};
      border: 1px solid ${props => props.theme.colorGrayLightest};
      font-size: 14px;
      padding: 2px 4px;
      margin-right: 7px;
    }

    .response {
      color: ${props => props.theme.colorBlue0};
    }
  }
`;
