import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import IntegratedTodo from "./pages/IntegratedTodo";
import PublicLayout from "./layouts/PublicLayout";
import React from "react";

const App = () => {
  return (
    <Routes>
      {/* Definisci il layout comune */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="todo/:id" element={<IntegratedTodo />} />
      </Route>
    </Routes>
  );
};

export default App;