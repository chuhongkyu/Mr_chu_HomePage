import App from "App";
import NotFound from "NotFound";
import Home from "pages/Home";
import Resume from "pages/Resume";
import { lazy } from "react";

const LazyProject = lazy(() => import('pages/Project'))
const LazyAbout = lazy(() => import('pages/About'))
const LazyOthers = lazy(() => import('pages/Others'))
const LazyDetail = lazy(() => import('pages/Detail'))

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
                  element: <LazyOthers />,
              },
              {
                  path: "project",
                  element: <LazyProject />,
              },
              {
                 path: "detail/:id",
                 element: <LazyDetail />,
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