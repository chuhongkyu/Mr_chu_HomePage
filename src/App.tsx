import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Meta from "utils/Meta";
import NotFound from "NotFound";
import Index from "pages/Index";
import { useEffect } from "react";
import Webgl from "webgl/Webgl";


function App() {
  const handleResize = () =>  {
    document.documentElement.style.setProperty('--100vh', `${window.innerHeight}px`);
  }

  useEffect(()=>{
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  },[])

  return (
    <HelmetProvider>
      <Webgl/>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Meta />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
