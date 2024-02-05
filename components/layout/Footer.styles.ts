import styled, { Theme } from 'styled-components';

type Props = {
  theme: Theme;
};

export const FooterContainer = styled.div<Props>`
  display: flex;
  justify-content: center;
  height: 100px;

  @media screen and (max-width: ${props => props.theme.width.mobile}) {
    margin-bottom: 70px;
  }
`;

export const FooterStyled = styled.footer<Props>`
  width: 1300px;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  // 글자 색상 변경
  div {
    color: ${props => props.theme.colorGrayLight};
    svg {
      fill: ${props => props.theme.colorGrayLight};
    }
  }

  .email {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 7px;
    font-weight: bold;
    transition: transform 0.2s ease;

    // 이메일 아이콘
    svg {
      width: 23px;
      height: 23px;
    }
  }

  .email:hover,
  .email:active {
    transform: scale(1.05);
    color: ${props => props.theme.colorBlue0};

    svg {
      fill: ${props => props.theme.colorBlue0};
    }
  }
`;
