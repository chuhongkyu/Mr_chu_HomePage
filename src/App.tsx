import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Meta from "utils/Meta";
import NotFound from "NotFound";
import Index from "pages/Index";
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
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Meta />
        <Routes>
          <Route index path="/" element={<Index />} />

          {/* <Route path="/*" element={<NotFound />} /> */}
          <Route path="/*" element={<Home />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
