import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

// '/' 페이지에서 사용
export const HomeSection = styled.section<Props>`
  margin: 0 auto; // 가운데 정렬
  margin-top: 75px; // MainNavbar 높이만큼 위의 여백 띄움

  display: flex;
  flex-direction: column;

  // MobileNavbar 높이에 맞게 위의 여백 띄움
  @media screen and (max-width: ${props => props.theme.width.tablet}) {
    margin-top: 60px;
  }
`;

// '/create', '/forms', '/analysis' 페이지에서 사용
export const Section = styled(HomeSection)<Props>`
  max-width: 900px;
  padding: 40px 0;

  // 가운데 정렬이 필요한 아이템
  .centered {
    align-self: center;
  }

  .controls {
    display: flex;
    gap: 20px;
  }

  // 화면 너비가 줄어들면 양옆의 여백 설정
  @media screen and (max-width: ${props => props.theme.width.tablet}) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

// Section 내부의 블럭
export const SectionCard = styled.div<Props>`
  background: ${props => props.theme.colorBackground0};
  box-shadow: ${props => props.theme.shadow};
  border-radius: ${props => props.theme.radius.large};
  padding: 40px 30px;
`;
