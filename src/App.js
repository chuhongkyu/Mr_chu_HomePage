import { BrowserRouter, Routes, Route } from "react-router-dom";
import Enter from "./pages/Enter";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
