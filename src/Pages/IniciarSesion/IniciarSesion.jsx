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
      console.log('📤 Enviando al backend:', {
        correo: formData.email,
        contrasena: formData.password
      });

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

      console.log('📡 Status HTTP:', response.status);

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

      // 🔥 AQUÍ ESTÁ LA CLAVE: Verificar si el login fue exitoso
      if (response.ok) {
        console.log('🎉 Login exitoso! Datos:', data);

        // 🔥 ADAPTACIÓN CRÍTICA: ¿Qué estructura devuelve tu backend?
        // Opción 1: Si devuelve { success: true, usuario: {...} }
        // Opción 2: Si devuelve directamente el usuario { id, nombre, correo, ... }
        
        let usuarioBackend;
        
        if (data.success && data.usuario) {
          // Opción 1: Estructura con "success" y "usuario"
          usuarioBackend = data.usuario;
        } else if (data.id || data.correo) {
          // Opción 2: Estructura directa del usuario
          usuarioBackend = data;
        } else {
          // Si no reconocemos la estructura, usar datos básicos
          usuarioBackend = {
            id: 1,
            correo: formData.email
          };
        }

        console.log('👤 Usuario obtenido del backend:', usuarioBackend);

        // 🔥 CREAR USUARIO ADAPTADO - ESTO ES LO MÁS IMPORTANTE
        const usuarioAdaptado = {
          id: usuarioBackend.id || 1,
          // 🔥 AQUÍ: Asegurarnos de guardar el NOMBRE del backend
          nombre: usuarioBackend.nombre || 'Usuario Autenticado',
          email: usuarioBackend.correo || usuarioBackend.email || formData.email,
          // No guardes la contraseña por seguridad
          rol: usuarioBackend.rol?.nombre || usuarioBackend.rol || 'cliente',
          telefono: usuarioBackend.telefono || null,
          direccion: usuarioBackend.direccion || null
        };

        console.log('👤 Usuario adaptado para frontend:', usuarioAdaptado);

        // 🔥 DOBLE GUARDADO (por si el contexto falla)
        // 1. Guardar directamente en localStorage (esto ya funcionaba)
        localStorage.setItem('usuario', JSON.stringify(usuarioAdaptado));
        
        // 2. También guardar en otra key por redundancia
        localStorage.setItem('isLoggedIn', 'true');
        
        // 3. Actualizar contexto global de autenticación
        login(usuarioAdaptado);
        
        // 🔥 REDIRECCIÓN ASEGURADA
        console.log('🔄 Redirigiendo a /');
        
        // Opción 1: Redirección normal (ya funcionaba)
        navigate('/');
        
        // Opción 2: Redirección forzada después de un pequeño delay
        setTimeout(() => {
          // Esto fuerza una navegación si navigate no funciona
          if (window.location.pathname === '/login') {
            window.location.href = '/';
          }
        }, 100);
        
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
      console.error('Error de conexión completo:', error);
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
            <p><strong>Debug info:</strong></p>
            <p>Endpoint: POST http://localhost:8081/usuario/login</p>
            <p>Email actual: {formData.email || '(vacío)'}</p>
            <p>Estado: {loading ? 'Cargando...' : 'Listo'}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}