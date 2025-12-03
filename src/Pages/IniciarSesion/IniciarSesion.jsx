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
      // 🔥 DEBUG: Mostrar lo que se envía
      console.log('📤 Enviando al backend:', {
        correo: formData.email,
        contrasena: formData.password
      });

      // 🔥 CONEXIÓN AL BACKEND SPRING BOOT
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

      // 🔥 DEBUG: Ver status
      console.log('📡 Status HTTP:', response.status);
      console.log('📡 OK?', response.ok);

      // Leer como texto primero para debug
      const responseText = await response.text();
      console.log('📦 Respuesta RAW:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ JSON parseado:', data);
      } catch (parseError) {
        console.error('❌ No es JSON válido:', responseText);
        setError('Error: El servidor devolvió una respuesta inválida');
        return;
      }

      // Verificar si el login fue exitoso
      if (response.ok && data.success) {
        console.log('🎉 Login exitoso! Datos:', data);

        // ✅ IMPORTANTE: El backend devuelve los datos en data.usuario
        // Estructura esperada: { success: true, usuario: { id, nombre, correo, ... } }
        const usuarioBackend = data.usuario || data; // Intenta con data.usuario, si no existe usa data directamente

        // Crear objeto adaptado para tu AuthContext
        const usuarioAdaptado = {
          id: usuarioBackend.id || 1,
          nombre: usuarioBackend.nombre || 'Usuario',
          email: usuarioBackend.correo || usuarioBackend.email || formData.email,
          password: usuarioBackend.contrasena || usuarioBackend.password || formData.password,
          rol: usuarioBackend.rol || 'usuario',
          telefono: usuarioBackend.telefono || null
        };

        console.log('👤 Usuario adaptado para contexto:', usuarioAdaptado);

        // Guardar en localStorage para persistencia
        localStorage.setItem('usuario', JSON.stringify(usuarioAdaptado));
        
        // Actualizar contexto global de autenticación
        login(usuarioAdaptado);
        
        // Redirigir al menú principal
        navigate('/');
        
      } else {
        // Manejar errores del backend
        console.log('❌ Error del backend:', data);
        
        if (data.message) {
          setError(data.message);
        } else if (response.status === 401) {
          setError('Correo o contraseña incorrectos');
        } else if (response.status === 404) {
          setError('Usuario no encontrado');
        } else if (data.error) {
          setError(data.error);
        } else {
          setError('Error en el servidor. Intenta nuevamente.');
        }
      }
      
    } catch (error) {
      console.error('💥 Error de conexión completo:', error);
      setError('Error de conexión con el servidor. Verifica que el backend esté corriendo en http://localhost:8081');
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
          
          {error && (
            <div className="alert alert-danger">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Tu contraseña"
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
              style={{ 
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{
                    display: 'inline-block',
                    width: '12px',
                    height: '12px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></span>
                  Procesando...
                </>
              ) : 'Ingresar'}
            </button>
          </form>
          
          <div className="login-links">
            <p>
              ¿No tienes cuenta? 
              <Link to="/Registrar" className="register-link">
                Regístrate aquí
              </Link>
            </p>
            <p>
              <Link to="/recuperar-password" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </div>
          
          {/* 🔥 NOTA DE DESARROLLO */}
          <div className="dev-note">
            <p><strong>Nota para desarrollo:</strong></p>
            <p>Endpoint: POST http://localhost:8081/usuario/login</p>
            <p>Body esperado: {"{"}"correo": "email", "contrasena": "password"{"}"}</p>
            <p>Revisa la consola (F12) para ver los logs</p>
          </div>
        </div>
      </div>

      {/* Estilos para el spinner */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}