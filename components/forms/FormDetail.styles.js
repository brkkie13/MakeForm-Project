import styled from 'styled-components';

export const FormDetailStyled = styled.article`
  display: flex;
  flex-direction: column;
  gap: 50px;

  .controls {
    display: flex;
    gap: 10px;
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
    color: gray;
  }
`;
