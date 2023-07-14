import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { ITheme, theme } from "./utils/theme";
import { RecoilRoot } from "recoil";
import * as ReactDOM from 'react-dom/client';

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const FontUrl = `${env.PUBLIC_URL}/assets/fonts/`;

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Maple_story";
  src: local("Maple_story"), url(${FontUrl}Maplestory_Light.woff) format("woff"),
  url(${FontUrl}Maplestory_OTF_Bold.otf) format("opentype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Maple_story";
  src: local("Maple_story"), url(${FontUrl}Maplestory_Bold.woff) format("woff"),
  url(${FontUrl}Maplestory_OTF_Light.otf) format("opentype");
  font-weight: bold;
  font-style: normal;
}

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
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  font-family: 'Noto Sans KR', sans-serif;
	line-height: 1.4;
	color: ${(props) => props.theme.black.darker};
  background-image: url("${env.PUBLIC_URL}/assets/img/bg.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
}

body{
  &.coach{
    *{
      box-sizing: border-box;
      border: 1px solid #38c96f;
    }
  }
}

ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none;
  color:inherit;
  user-select: none;
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

declare global {
  interface Window {
    snapSaveState?: () => void;
    snapRenderCallback?: () => void;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);