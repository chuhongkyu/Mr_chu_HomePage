import { HelmetProvider } from "react-helmet-async";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Meta from "utils/Meta";
import { lazy, useEffect } from "react";

const LazyWebgl = lazy(() => import("webgl/Webgl"));


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
    if(location.pathname == '/'){
      navigate("/home")
    }
  }, [location]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <HelmetProvider>
      <LazyWebgl/>
      <Meta />
      <Outlet/>
    </HelmetProvider>
  );
}

export default App;
