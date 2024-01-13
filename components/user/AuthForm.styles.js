import styled from 'styled-components';

export const AuthFormStyled = styled.form`
  h1 {
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;

    .toggle-authmode-prompt {
      display: flex;
      justify-content: center;
      gap: 5px;
    }
  }
`;
