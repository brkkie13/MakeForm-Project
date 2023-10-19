import styled from 'styled-components';

export const FormTypeWrapper = styled.article`
  margin-top: 30px;
  background: white;
  width: 750px;
  padding: 30px 0;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .trash-icon {
    position: absolute;
    width: 20px;
    top: 44%;
    right: 15px;
    color: gray;
  }

  .trash-icon:hover {
    cursor: pointer;
    color: #f44336;
  }
`;
