import App from "App";
import NotFound from "NotFound";
import About from "pages/About";
import Detail from "pages/Detail";
import GitHub from "pages/GitHub";
import Home from "pages/Home";
import Others from "pages/Others";
import Project from "pages/Project";
import Resume from "pages/Resume";

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
                  element: <About />,
              },
              {
                  path: "github",
                  element: <GitHub />,
              },
              {
                  path: "game_app",
                  element: <Others />,
              },
              {
                  path: "project",
                  element: <Project />,
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