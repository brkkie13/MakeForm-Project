'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  // 기본 폰트 크기
  font-family: inherit;
  font-size: 16px;
  box-sizing: border-box;
  color: ${props => props.theme.colorBlackOrWhite};
  }

  body {
    background: ${props => props.theme.colorBackground1}; // 배경색
    width: 100vw;
    height: auto;
  }

  li,button,svg :hover {
    cursor: pointer;
  }

  // reset CSS
  html,body,ul,ol,h1,h2,h3,h4,h5,h6,p,span,svg,input,textarea,button,select {
    margin: 0;
    padding: 0;
  }

  h1 {
    font-size: 28px;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;   
  }

  input,textarea {
    background: none;
    border: none;
    outline: none;
    vertical-align: bottom; // textarea border 밖의 아래에 있는 미세한 여백 없앰.
    resize: none; // textarea 사이즈 조절 없애기
  }

  input:focus, textarea:focus {
    outline: none;
  }

  button {
    background: none;
    border: none;
  }

`;

export default GlobalStyle;
