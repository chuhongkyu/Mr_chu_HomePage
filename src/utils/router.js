import App from "App";
import NotFound from "NotFound";
import Detail from "pages/Detail";
import Home from "pages/Home";
import Others from "pages/Others";
import Resume from "pages/Resume";
import { lazy } from "react";

const LazyProject = lazy(() => import('pages/Project'))
const LazyAbout = lazy(() => import('pages/About'))

export const routerInfo = [
    {
      path: "/",
      element: <App/>,
      errorElement: <NotFound/>,
      children: [
        {
            path: "home",
            element: <Home/>,
            errorElement: <div>error</div>,
            children: [
              {
                  path: "resume",
                  element: <Resume />,
              },
              {
                  path: "about",
                  element: <LazyAbout />,
              },
              {
                  path: "game_app",
                  element: <Others />,
              },
              {
                  path: "project",
                  element: <LazyProject />,
              },
              {
                 path: "detail/:id",
                 element: <Detail />,
              },
              {
                path: "*",
                element: <Home />,
              },
            ]
        },
      ]
    },
    
]