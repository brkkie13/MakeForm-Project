'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
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

  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
  
  body > section {
    padding-top: 65px;
    background: #f6f6f6;
    height: 100vh;
  }

  ul {
    marin: 0;
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
  }

  
`;

export default GlobalStyle;
