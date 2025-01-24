import { Routes, Route } from "react-router-dom";
import React from "react";
import About from "./components/About";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;
