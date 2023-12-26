import styled from 'styled-components';

export const FormTypeCardStyled = styled.article`
  background: ${props => props.theme.colorBackground0};
  margin-bottom: 25px;
  padding: 30px 0;
  border-radius: ${props => props.theme.radiusLarge};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadow};

  .content {
    flex: 9; // 두번째 자식 div가 90%의 너비를 차지
    padding: 0 20px;

    button {
      margin-top: 20px;
    }
  }

  .icon {
    flex: 1; // 첫번째와 세번째 자식 div가 각각 5%의 너비를 차지
    display: flex;
    justify-content: center;
  }

  .drag-icon {
    cursor: grab;
  }
`;
