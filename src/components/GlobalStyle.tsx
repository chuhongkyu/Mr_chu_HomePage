import { createGlobalStyle } from "styled-components";

const FontUrl = `/assets/fonts/`;

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "Noto Sans KR";
    src: url(${FontUrl}NotoSansKR400.woff2) format("woff2");
    font-weight: 400;
    font-style: normal;
    font-display: swap; 
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${FontUrl}NotoSansKR500.woff2) format("woff2");
    font-weight: 500;
    font-style: normal;
    font-display: swap; 
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${FontUrl}NotoSansKR700.woff2) format("woff2");
    font-weight: 700;
    font-style: normal;
    font-display: swap; 
  }

  @font-face {
    font-family: "Montserrat";
    src: url(${FontUrl}Montserrat-SemiBold.woff) format("woff");
    font-weight: 600;
    font-style: normal;
    font-display: swap; 
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
    color: ${(props) => props.theme.black.darker};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  html { 
    font-size: max(var(--dynamic-font-size), 10px)
  }

  ::-moz-selection {
    background: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.lighter};
  }
  ::selection {
    background: ${(props) => props.theme.black.darker};
    color: ${(props) => props.theme.white.lighter};
  }

  h1 {
    display: block;
    text-align: left;
    font-size: max(2.0833vw, 20px);
    font-weight: 600;
  }

  .font-app{
    font-display: swap;
    font-family: "Montserrat", sans-serif;
    text-align: center;
    font-size: max(1vw, 14px);
    letter-spacing: -0.01em ;
    font-weight: 600;
  }
`;