import styled from 'styled-components';

const Section = styled.section`
  margin: 0 auto; // 가운데 정렬
  max-width: 900px;

  // MainNavbar 높이에 맞게 수정
  margin-top: 75px;

  display: flex;
  flex-direction: column;

  padding: 40px 0;

  h1 {
    margin-bottom: 30px;
  }

  // app/page.jsx
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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

  // 화면 너비가 줄어들면 양옆의 여백 설정
  @media screen and (max-width: ${props => props.theme.tabletWidth}) {
    margin-left: 5%;
    margin-right: 5%;
  }

  // MobileNavbar 높이에 맞게 수정
  @media screen and (max-width: ${props => props.theme.mobileWidth}) {
    margin-top: 60px;
  }
`;

export default Section;
