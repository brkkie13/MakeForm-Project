import styled from 'styled-components';

export const AuthFormStyled = styled.form`
  h1 {
    margin-bottom: 20px;
  }

  button {
    width: 100%;
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
`;
