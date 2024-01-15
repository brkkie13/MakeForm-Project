import styled from 'styled-components';

export const CarouselItemStyled = styled.div`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;

  .text-area {
    max-width: 450px; // Section컴포넌트의 max-width: 900px과 맞춰줌
    flex: 1;
    white-space: break-spaces; // 글자가 영역을 초과하면 줄바꿈
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative; // 글이 길어 줄바꿈 되었을 때 text-content 위에 여백이 생기지 않도록 함

    .text-content {
      position: absolute; // 글이 길어 줄바꿈 되었을 때 text-content 위에 여백이 생기지 않도록 함
    }
  }

  .image-area {
    max-width: 450px; // Section컴포넌트의 max-width: 900px과 맞춰줌
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
      width: 90%;
      height: 50%;
    }
  }
`;
