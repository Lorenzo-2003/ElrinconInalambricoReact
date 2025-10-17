// Menu.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Menú Principal</h1>
      <p>Bienvenido a la aplicación</p>
      
      <button onClick={() => navigate('/login')}>
        Ir a Iniciar Sesión
      </button>
    </div>
  );
}

export default Menu;