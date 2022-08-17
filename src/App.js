import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Enter from "./pages/Enter";
import Home from "./pages/Home";

function App() {
  let params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Mr.chu 홈페이지</title>
        <meta name="미스터 추" content="미스터 추" />
      </Helmet>
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
