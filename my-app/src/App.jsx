import { Routes, Route } from "react-router-dom";
import React from "react";
import About from "./pages/About";
import Home from "./pages/Home";
import Nav from "./components/Nav";

const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<div></div>} /> {/* Rotta vuota */}
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
