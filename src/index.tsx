import App from "./App";
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "components/GlobalStyle";
import 'index.css';


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);