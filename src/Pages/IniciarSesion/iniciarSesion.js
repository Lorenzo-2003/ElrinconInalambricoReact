import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usuariosValidos } from './iniciarSesion.js'; // Mantenemos import
import './iniciarSesion.css';
import Header from "../../Components/Header";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [usingBackend, setUsingBackend] = useState(true); // Para mostrar estado

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsingBackend(true);

    try {
      const response = await fetch('http://localhost:8081/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,
          contrasena: formData.password
        }),
      });

      if (response.status === 200) {
        //  ÉXITO: Backend responde
        const usuario = await response.json();
        
        const usuarioAdaptado = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.correo,
          password: usuario.contrasena,
          rol: usuario.rol || 'usuario',
          telefono: usuario.telefono
        };

        login(usuarioAdaptado);
        navigate('/');
        return; // Salir si éxito
        
      } else if (response.status === 401) {
        setError('Correo o contraseña incorrectos (Backend)');
      } else {
        // Si backend falla, intentamos con datos locales
        console.log('Backend no disponible, usando datos locales...');
        setUsingBackend(false);
        tryLocalLogin();
      }
      
    } catch (error) {
      // 🔥 ERROR DE CONEXIÓN: Usamos datos locales
      console.log('Error de conexión al backend, usando datos locales:', error);
      setUsingBackend(false);
      tryLocalLogin();
    } finally {
      setLoading(false);
    }
  };

  // Función para login con datos locales
  const tryLocalLogin = () => {
    const usuarioEncontrado = usuariosValidos.find(
      user => user.email === formData.email && user.password === formData.password
    );
    
    if (usuarioEncontrado) {
      login(usuarioEncontrado);
      navigate('/');
    } else {
      setError('Email o contraseña incorrectos (Modo Local)');
    }
  };

  return (
    <div className="menu-bg" style={{minHeight: '100vh'}}>
      <Header />
      
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Iniciar Sesión</h2>
          
          {/* Indicador de modo */}
          {!usingBackend && (
            <div className="alert alert-warning" style={{fontSize: '12px'}}>
              <strong>Modo Local:</strong> Usando datos de prueba (backend no disponible)
            </div>
          )}
          
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
            <button 
              type="submit" 
              className="btn-login"
              disabled={loading}
            >
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>
          </form>
          
          <div className="login-links">
            <p>¿No tienes cuenta? <Link to="/Registrar">Regístrate aquí</Link></p>
          </div>
          
          {/* Información para desarrollo */}
          <div style={{
            marginTop: '20px', 
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            fontSize: '11px',
            color: '#666',
            textAlign: 'left'
          }}>
            <p><strong>Credenciales de prueba (Modo Local):</strong></p>
            <ul style={{margin: '5px 0', paddingLeft: '15px'}}>
              <li><strong>Cliente:</strong> Mar@gmail.com / Jok20</li>
              <li><strong>Admin:</strong> admin@test.com / admin123</li>
              <li><strong>Cliente 2:</strong> lorenzo@test.com / password</li>
            </ul>
            <p style={{marginTop: '8px'}}>
              <strong>Backend:</strong> {usingBackend ? '🟢 Conectado' : '🔴 Usando local'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}