import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usuariosValidos } from './iniciarSesion.js';
import './iniciarSesion.css';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usuarioEncontrado = usuariosValidos.find(
      user => user.email === formData.email && user.password === formData.password
    );
    
    if (usuarioEncontrado) {
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
      window.location.href = './Menu2';
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="menu-bg" style={{minHeight: '100vh'}}>
      {/* USA el Header importado */}
      
      
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Iniciar Sesión</h2>
          
          {error && <div className="alert alert-danger">{error}</div>}
          
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
            <p>¿No tienes cuenta? <Link to="/Registrar">Regístrate aquí</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}