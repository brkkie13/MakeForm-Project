import styled from 'styled-components';

export const InputOptionsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  row-gap: 20px;
  column-gap: 30px;
  margin: 0px 15px;

  // 옵션 삭제버튼과 관련
  .option {
    position: relative;
  }
`;
