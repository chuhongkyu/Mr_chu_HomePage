import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "styled-components";
import { theme } from "utils/theme";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "components/GlobalStyle";
import 'index.css';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routerInfo } from "utils/router"
import RQProvider from 'components/RQProvider';

const router = createBrowserRouter(routerInfo)

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RQProvider>
        <RouterProvider router={router} />
      </RQProvider>
    </ThemeProvider>
  </RecoilRoot>
);