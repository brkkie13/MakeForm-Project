import styled from 'styled-components';

export const MultipleChoiceInputStyled = styled.div`
  padding: 15px 25px;
  gap: 8px;
  border-radius: 5px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;

  label {
    width: 100%;

    span {
      display: block;
      white-space: normal;
      overflow-wrap: break-word;
    }
  }

  input {
    width: 100%;
  }

  [type='radio'] {
    display: none;
  }

  label {
    position: relative;
    padding-left: 40px;
  }

  label::after,
  label::before {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  label::after {
    height: 16px;
    width: 16px;
    border: 2px solid gray;
    left: 0px;
    top: calc(50% - 10px);
  }

  label::before {
    background-color: ${props => props.theme.colors.pointSkyblue};
    height: 10px;
    width: 10px;
    left: 5px;
    top: calc(50% - 5px);
    opacity: 0;
    visibility: hidden;
  }

  [type='radio']:checked ~ label::after {
    border-color: ${props => props.theme.colors.pointSkyblue};
  }

  [type='radio']:checked ~ label::before {
    opacity: 1;
    visibility: visible;
  }
`;
