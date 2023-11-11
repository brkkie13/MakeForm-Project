import styled from 'styled-components';

export const FormDetailStyled = styled.article`
  background: ${props => props.theme.colors.block};
  margin: 0 auto;
  width: 750px;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  padding: 50px;

  .controls {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-end;
  }

  h1 {
    margin-bottom: 30px;
  }
`;

export const FormItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 0;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }

  .title {
    margin-bottom: 20px;
  }

  .placeholder-text {
    color: gray;
  }
`;

export const OptionsStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  /* margin: 0px 10px; */

  .option {
    display: flex;
    align-items: center;
    padding: 7px 15px;
    gap: 8px;
    border-radius: 5px;
    border: 1px solid lightgray;

    svg {
      flex-shrink: 0; // text가 길어져도 아이콘은 작아지지 않게.
      fill: darkgray;
    }
  }
`;
