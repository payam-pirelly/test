import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Work from "./pages/work";
import Nav from "./components/nav";
import { Container } from "@mui/material";
import Iframe from "./pages/iframe";

function App() {
  return (
    <>
      <Container maxWidth="xl">
        {/* <Nav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Work" element={<Work />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/iframe" element={<Iframe />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
