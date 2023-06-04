import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "pages/Enter";
import Home from "pages/Home";
import Meta from "utils/Meta";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateType } from "atoms";


function App() {
  const [keyValue, setKeyValue] = useRecoilState(stateType)
  const getParam = (key:string) => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);

    return params.get(key);
  };

  useEffect(()=>{
    const state = getParam('test')
    if(state){
      setKeyValue(true)
    }else{
      setKeyValue(false)
    }
  },[])
  
  return (
    <HelmetProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Meta />
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
