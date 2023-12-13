import styled from 'styled-components';

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100px;

  @media screen and (max-width: 768px) {
    margin-bottom: 70px;
  }
`;

export const FooterStyled = styled.footer`
  width: 1300px;
  padding: 0 30px;

  display: flex;
  justify-content: space-between;
  align-items: center;

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
  }
`;
