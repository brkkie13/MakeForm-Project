'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  // 기본 폰트 크기
  font-family: inherit;
  font-size: 16px;
  box-sizing: border-box;
  color: ${props => props.theme.colors.font};
  }
  
  body {
    background: ${props => props.theme.colors.background2};
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  html,body,ul,h1,h2,h3,h4,h5,h6,p,span,svg {
    margin: 0;
    padding: 0;
  }

  ul,button,svg :hover {
    cursor: pointer;
  }

  html {
    font-size: 13px;
    margin: 0;
    padding: 0;
  }


  
  body > section {
    padding-top: 65px;
    background: #f6f6f6;
    height: 100vh;
  }

  ul {
    margin: 0;
    padding: 0;
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
    margin: 0;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    padding: 0;
  }
`;

export default GlobalStyle;
