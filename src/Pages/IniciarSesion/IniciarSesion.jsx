import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './iniciarSesion.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del login:', formData);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-login">
            Ingresar
          </button>
        </form>
         <div className="login-links">
          <p>
            ¿No tienes cuenta? <Link to="/registrar">Regístrate aquí</Link>
          </p>
          <p>
            <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
          </p>
        </div>
      </div>
    </div>
  );
}