import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}
  :root {
   
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    overflow-x: hidden;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #root {
    width: 1920px;
    height: 1440px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video{
    color: var(--BLACK);
  }
  /* width */
  ::-webkit-scrollbar {
    width: 15px;
  }
  textarea {
    font-family: 'Noto Sans KR', sans-serif;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--GREY); 
  }
 
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--RED); 
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }
  h2 {
  }
  h3 {
  }
  main {
  }
  .container {
    max-width: 1920px;
    margin: 0 auto;
    @media only screen and (max-width:1920px){
      padding: 0 20px;
    }
  }
  @media only screen and (max-width:768px) {
    body {
      font-size: 12px;
    }
    .container {
      width: 90vw;
      padding: 0;
    }
  }
  @media only screen and (max-width: 480px) {
    main {
      padding-top: 40px;
    }
  }

`;
export default GlobalStyle;
