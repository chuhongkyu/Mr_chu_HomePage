import { createGlobalStyle } from "styled-components";
import { ITheme } from "utils/theme";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const FontUrl = `${env.PUBLIC_URL}/assets/fonts/`;

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Noto Sans KR";
  src: url(${FontUrl}NotoSansKR400.woff2) format("woff2");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "Noto Sans KR";
  src: url(${FontUrl}NotoSansKR500.woff2) format("woff2");
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: "Noto Sans KR";
  src: url(${FontUrl}NotoSansKR700.woff2) format("woff2");
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: "Montserrat";
  src: url(${FontUrl}Montserrat-SemiBold.woff) format("woff");
  font-weight: 600;
  font-style: normal;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  color: ${(props) => props.theme.black.darker};
  background-image: url("${env.PUBLIC_URL}/assets/img/bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

::-moz-selection {
   background: ${(props: ITheme) => props.theme.black.darker};
   color: ${(props: ITheme) => props.theme.white.lighter};
}
::selection {
   background: ${(props: ITheme) => props.theme.black.darker};
   color: ${(props: ITheme) => props.theme.white.lighter};
}
`;