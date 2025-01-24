import { Routes, Route } from "react-router-dom";
import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import Layout from "./layouts/PublicLayout";
import PublicLayout from "./layouts/PublicLayout";
const App = () => {
  return (
    <Routes>
      {/* Definisci il layout comune */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}

export default App;
