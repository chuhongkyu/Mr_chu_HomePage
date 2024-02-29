import { HelmetProvider } from "react-helmet-async";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Meta from "utils/Meta";
import { useEffect } from "react";
import Webgl from "webgl/Webgl";

function App() {
  const handleResize = () => {
    const baseFontSize = 18;
    const screenWidth = window.innerWidth;
    const calculatedFontSize = screenWidth / 1920 * baseFontSize;
    const dynamicFontSize = Math.min(baseFontSize, calculatedFontSize);

    document.documentElement.style.setProperty('--dynamic-font-size', `${dynamicFontSize}px`);
  };
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    if(location.pathname === '/'){
      navigate("/home")
    }
  }, [location, navigate]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <HelmetProvider>
      <Webgl/>
      <Meta />
      <Outlet/>
    </HelmetProvider>
  );
}

export default App;
