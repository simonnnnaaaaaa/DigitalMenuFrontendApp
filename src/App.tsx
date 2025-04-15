import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Navbar from "components/Navbar";
import { LanguageProvider } from "LanguageContext";

function App() {
  return (
    <LanguageProvider>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
    </LanguageProvider>
  );
}

export default App;
