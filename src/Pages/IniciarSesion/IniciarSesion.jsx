// IniciarSesion.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';

function IniciarSesion() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <p>Formulario de login aquí...</p>
      
      <button onClick={() => navigate('/')}>
        Volver al Menú
      </button>
    </div>
  );
}

export default IniciarSesion;