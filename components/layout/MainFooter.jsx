'use client';
import styled from 'styled-components';

export const Footer = styled.footer`
  /* background-color: #f1f1f1; */
  bottom: 0;
  width: 100%;
  height: 60px;
  margin-top: 100px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin: 0 5px;
    &:nth-child(1) {
      font-weight: bold;
    }
  }
`;

function MainFooter() {
  return (
    <Footer>
      <span>©Bora Lee</span>
      <span>brkkie13@naver.com</span>
    </Footer>
  );
}

export default MainFooter;
