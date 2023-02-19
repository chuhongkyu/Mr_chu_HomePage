import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "pages/Enter";
import Home from "pages/Home";
import Meta from "utils/Meta";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateType } from "atoms";


function App() {
  const getParam = (key:string) => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);

    return params.get(key);
  };

  useEffect(()=>{
    const state = getParam('test')
    console.log('state:', state)
  },[])
  
  return (
    <HelmetProvider>
      <Meta />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
