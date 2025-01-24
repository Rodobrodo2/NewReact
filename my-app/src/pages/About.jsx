import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
    const navigate = useNavigate();

    const goToHome = () => {
      navigate("/home");
    };
  
    return (
      <div>
        <h2>Questa è la pagina About!</h2>
        <p>Benvenuto nella pagina "About" della nostra applicazione!</p>
        <button onClick={goToHome}>Vai alla Home</button>
      </div>
    );
}

export default About;