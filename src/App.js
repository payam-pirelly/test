import { Routes, Route } from "react-router-dom";
import Iframe from "./pages/iframe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Iframe />} />
    </Routes>
  );
}

export default App;
