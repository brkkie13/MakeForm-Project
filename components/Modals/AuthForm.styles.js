import styled from 'styled-components';

export const AuthFormStyled = styled.form`
  h1 {
    margin-bottom: 20px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 20px;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;

      // 구글 로고
      svg {
        width: 18px;
        height: 18px;
      }
    }

    .line-group {
      display: flex;
      align-items: center;

      .line {
        flex-grow: 1;
        height: 1px;
        background: gray;
      }

      p {
        padding: 0 8px;
        font-size: 14px;
        color: gray;
      }
    }
  }

  .toggle-authmode-prompt {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
`;
