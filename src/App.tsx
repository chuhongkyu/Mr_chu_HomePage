import { HelmetProvider } from "react-helmet-async";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Meta from "utils/Meta";
import { useEffect } from "react";
import Webgl from "webgl/Webgl";

function App() {
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/'){
      navigate("/home")
    }
  }, [location, navigate]);

  return (
    <HelmetProvider>
      <Webgl/>
      <Meta />
      <Outlet/>
    </HelmetProvider>
  );
}

export default App;
