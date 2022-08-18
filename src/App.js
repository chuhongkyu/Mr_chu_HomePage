import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import GoHome from "./components/GoHome";
import Enter from "./pages/Enter";
import Home from "./pages/Home";
import Meta from "./utils/Meta";

function App() {
  return (
    <HelmetProvider>
      <Meta />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/index.html" element={<GoHome />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
