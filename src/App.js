import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Enter from "./pages/Enter";
import Home from "./pages/Home";
import Meta from "./utils/Meta";

function App() {
  let params = useParams();
  useEffect(() => {
    console.log(params);
  }, []);

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
