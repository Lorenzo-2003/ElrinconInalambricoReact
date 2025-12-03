import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usuariosValidos } from './iniciarSesion.js';
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
  const [usingBackend, setUsingBackend] = useState(true);

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

      // 🔥 ÉXITO: Backend responde
      if (response.ok) {
        console.log('🎉 Login exitoso! Datos del backend:', data);
        
        // 🔥 CLAVE: Los datos vienen en data.usuario, NO directamente en data
        if (!data.usuario) {
          console.error('❌ Error: El backend no devolvió "usuario" en la respuesta');
          console.log('Respuesta completa:', data);
          setError('Error en la respuesta del servidor');
          return;
        }

        const usuarioBackend = data.usuario;
        console.log('👤 Datos del usuario desde backend:', usuarioBackend);

        // 🔥 DETERMINAR ROL CORRECTAMENTE
        let rolNombre = 'usuario'; // Valor por defecto
        
        // Opción 1: Si viene rol como string (lo más común)
        if (usuarioBackend.rol) {
          console.log(`🎯 Rol recibido del backend: "${usuarioBackend.rol}"`);
          
          // Normalizar: convertir "Usuario" a "usuario", "admin" queda igual
          if (usuarioBackend.rol.toLowerCase().includes('admin')) {
            rolNombre = 'admin';
          } else {
            rolNombre = 'usuario';
          }
        }
        // Opción 2: Si viene rol_id (por si acaso)
        else if (usuarioBackend.rol_id) {
          console.log(`🎯 Rol recibido como ID: ${usuarioBackend.rol_id}`);
          const roleMap = { 1: 'admin', 4: 'usuario' };
          rolNombre = roleMap[usuarioBackend.rol_id] || 'usuario';
        }

        console.log(`🔍 Rol asignado: "${rolNombre}"`);

        // 🔥 CREAR USUARIO ADAPTADO
        const usuarioAdaptado = {
          id: usuarioBackend.id || 1,
          nombre: usuarioBackend.nombre || 'Usuario',
          email: usuarioBackend.email || formData.email,
          rol: rolNombre, // "admin" o "usuario"
          rol_original: usuarioBackend.rol, // Para debug
          telefono: usuarioBackend.telefono || null
        };

        console.log('👤 Usuario adaptado para frontend:', usuarioAdaptado);
        console.log(`✅ ${usuarioAdaptado.nombre} es ${usuarioAdaptado.rol}`);

        // 🔥 GUARDAR EN LOCALSTORAGE
        localStorage.setItem('usuario', JSON.stringify(usuarioAdaptado));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Actualizar contexto
        login(usuarioAdaptado);
        
        // 🔥 REDIRECCIÓN
        navigate('/');
        
      } else {
        // 🔥 ERROR DEL BACKEND
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
          setError(`Error del servidor (${response.status})`);
        }
        
        // Si backend falla, intentamos con datos locales
        console.log('Backend no disponible, usando datos locales...');
        setUsingBackend(false);
        tryLocalLogin();
      }
      
    } catch (error) {
      // 🔥 ERROR DE CONEXIÓN
      console.error('❌ Error de conexión completo:', error);
      setUsingBackend(false);
      tryLocalLogin();
    } finally {
      setLoading(false);
    }
  };

  // Función para login con datos locales
  const tryLocalLogin = () => {
    console.log('🔄 Intentando login con datos locales...');
    const usuarioEncontrado = usuariosValidos.find(
      user => user.email === formData.email && user.password === formData.password
    );
    
    if (usuarioEncontrado) {
      console.log('✅ Login local exitoso:', usuarioEncontrado);
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
            <div className="alert alert-warning" style={{
              fontSize: '12px',
              padding: '8px',
              marginBottom: '15px',
              backgroundColor: '#fff3cd',
              border: '1px solid #ffeaa7'
            }}>
              <strong>⚠️ Modo Local:</strong> Usando datos de prueba
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" style={{
              padding: '10px',
              marginBottom: '15px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
              borderRadius: '4px'
            }}>
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
          
          {/* 🔥 DEBUG INFO */}
          <div className="dev-note" style={{
            marginTop: '20px',
            padding: '10px',
            backgroundColor: '#f8f9fa',
            borderRadius: '5px',
            fontSize: '12px',
            color: '#666'
          }}>
            <p><strong>Debug info:</strong></p>
            <p>Endpoint: POST http://localhost:8081/usuario/login</p>
            <p>Email actual: {formData.email || '(vacío)'}</p>
            <p>Estado: {loading ? 'Cargando...' : 'Listo'}</p>
            <p>Modo: {usingBackend ? '🟢 Backend' : '🟡 Local'}</p>
          </div>
          
          {/* Credenciales de prueba */}
          <div style={{
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#e8f4fd',
            borderRadius: '5px',
            fontSize: '11px',
            color: '#0066cc'
          }}>
            <p><strong>Credenciales de prueba:</strong></p>
            <ul style={{margin: '5px 0', paddingLeft: '15px'}}>
              <li><strong>Admin:</strong> admin@test.com / admin123</li>
              <li><strong>Usuario:</strong> user@test.com / user123</li>
              <li><strong>Local:</strong> Mar@gmail.com / Jok20</li>
            </ul>
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