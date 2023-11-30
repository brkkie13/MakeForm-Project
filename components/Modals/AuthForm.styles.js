import styled from 'styled-components';

export const AuthFormStyled = styled.form`
  h1 {
    margin-bottom: 20px;
  }

  .error-message {
    display: flex;
    align-items: center;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 18px;
    margin-bottom: 30px;
    font-weight: 500;

    svg {
      width: 30px;
      height: 30px;
      fill: ${props => props.theme.colors.pointRed};
      margin-right: 8px;
    }
  }

  .hide {
    display: none;
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

      svg {
        width: 18px;
        height: 18px;
        fill: ${props => props.theme.colors.pointSkyblue};
      }
    }

    .line-group {
      /* margin-top: 10px; */
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

  .authmode-toggle-button {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    a {
      margin-left: 5px;
      color: ${props => props.theme.colors.pointSkyblue};
    }
    a:hover {
      cursor: pointer;
    }
  }
`;
