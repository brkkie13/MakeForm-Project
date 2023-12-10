import styled from 'styled-components';

const Section = styled.section`
  background: ${props => props.theme.colors.background2};
  margin: 0 auto;
  max-width: 900px;
  padding: 30px 0;

  margin-top: 75px; // MainNavbar 높이에 맞게 수정.

  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 30px;
  }

  // app/page.jsx
  .cards {
    display: flex;
    gap: 15px;
  }

  // 가운데 정렬이 필요한 아이템
  .centered {
    align-self: center;
  }

  .controls {
    display: flex;
    gap: 20px;
  }

  @media screen and (max-width: 1000px) {
    margin-left: 5%;
    margin-right: 5%;
  }

  @media screen and (max-width: 768px) {
    margin-top: 60px; // MobileNavbar 높이에 맞게 수정.
    margin-bottom: 75px; // MobileNavbar 높이에 맞게 수정.
  }
`;

export default Section;
