// import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Headers from "./components/Headers.js";

import { zRoute } from "./routes/route.js";
function App() {
  return (
    <BrowserRouter>
      <Headers />
      <Routes>
        {zRoute.map((item, idx) => (
          <>
            <Route path={item.link} element={item.element} />
          </>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
