import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Meta from "utils/Meta";
import NotFound from "NotFound";
import Index from "pages/Index";


function App() {
  return (
    <HelmetProvider>
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
