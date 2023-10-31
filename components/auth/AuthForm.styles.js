import styled from 'styled-components';

export const UserInputForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;

  input {
    border: 1px solid lightgray;
    padding: 10px;
    border-radius: 5px;
    color: white;
  }

  input:focus {
    border-color: ${props => props.theme.colors.pointSkyblue};
    outline: none;
  }

  .input-alert {
    font-size: 12px;
    color: red;
    margin: 0;
  }
`;
