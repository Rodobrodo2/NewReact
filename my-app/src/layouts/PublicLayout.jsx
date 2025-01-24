import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const PublicLayout = () => {
  return (
    <div>
      <Nav />
      <main>
        <Outlet /> {/* Qui verranno renderizzate le pagine figlie */}
      </main>
    </div>
  );
};

export default PublicLayout;