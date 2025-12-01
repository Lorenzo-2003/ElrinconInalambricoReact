import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    try {
      // 🔥 CONEXIÓN AL BACKEND SPRING BOOT
      const response = await fetch('http://localhost:8081/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: formData.email,    // Nota: backend usa "correo", no "email"
          contrasena: formData.password // Nota: backend usa "contrasena", no "password"
        }),
      });

      if (response.status === 200) {
        const usuario = await response.json();
        
        // Adaptar objeto para que coincida con lo que espera tu AuthContext
        const usuarioAdaptado = {
          id: usuario.id,
          nombre: usuario.nombre,
          email: usuario.correo, // Mapear correo → email
          password: usuario.contrasena, // Mapear contrasena → password
          rol: usuario.rol || 'usuario',
          telefono: usuario.telefono
        };

        // Actualizar contexto global de autenticación
        login(usuarioAdaptado);
        
        // Redirigir al menú principal
        navigate('/');
        
      } else if (response.status === 401) {
        setError('Correo o contraseña incorrectos');
      } else {
        setError('Error en el servidor. Intenta nuevamente.');
      }
      
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="menu-bg" style={{minHeight: '100vh'}}>
      <Header />
      
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
          
          {/* 🔥 NOTA DE DESARROLLO (quitar en producción) */}
          <div style={{marginTop: '20px', fontSize: '12px', color: '#666', textAlign: 'center'}}>
            <p><strong>Nota para desarrollo:</strong></p>
            <p>Backend: http://localhost:8081/usuario/login</p>
            <p>Para producción cambiar a: http://18.207.254.56:8081/usuario/login</p>
          </div>
        </div>
      </div>
    </div>
  );
}