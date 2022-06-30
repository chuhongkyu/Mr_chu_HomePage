import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import { RecoilRoot } from "recoil";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const FontUrl = `${env.PUBLIC_URL}/assets/fonts/`;

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Maple_story";
  src: local("Maple_story"), url(${FontUrl}Maplestory_Bold.ttf?#iefix) format("truetype"),
  url(${FontUrl}Maplestory_OTF_Bold.otf) format("opentype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Maple_story";
  src: local("Maple_story"), url(${FontUrl}Maplestory_Light.ttf?#iefix) format("truetype"),
  url(${FontUrl}Maplestory_OTF_Light.otf) format("opentype");
  font-weight: normal;
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
	font-family: "Maple_story";
	line-height: 1.4;
	color: ${(props) => props.theme.black.darker};
	background-image: url("${env.PUBLIC_URL}/assets/img/bg.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
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
   background: black;
   color: #fff;
}
::selection {
   background: black;
   color: #fff;
}
`;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
