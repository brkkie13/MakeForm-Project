import styled from 'styled-components';

export const Form = styled.form`
  margin: 20px 0;
  border-radius: 6px;
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  gap: 10px;

  .control select,
  .control label {
    background-color: white;
    height: 40px;
    border-radius: 8px;
    border: 1px solid lightgray;
    padding: 0 10px;
  }

  svg {
    width: 23px;
    fill: lightgray;
    margin-right: 5px;
  }

  label {
    display: flex;
    align-items: center;
    font-size: 18px;
  }

  input {
    width: 100%;
  }
`;
