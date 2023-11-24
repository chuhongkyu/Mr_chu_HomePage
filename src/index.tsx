import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { theme } from "./utils/theme";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "components/GlobalStyle";
import 'index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerInfo } from 'utils/router';

const router = createBrowserRouter(routerInfo)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  </RecoilRoot>
);