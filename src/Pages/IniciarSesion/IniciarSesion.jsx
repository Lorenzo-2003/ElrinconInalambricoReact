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
      console.log('📦 Respuesta RAW del backend:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ JSON parseado del backend:', data);
      } catch (parseError) {
        console.error('❌ No es JSON válido:', responseText);
        setError('Error: El servidor devolvió una respuesta inválida');
        return;
      }

      // 🔥 VERIFICAR SI EL LOGIN FUE EXITOSO
      if (response.ok) {
        console.log('🎉 Login exitoso! Datos completos del backend:', data);

        // 🔥 CLAVE: MAPEAR rol_id A NOMBRE DE ROL
        // Solo dos roles: admin (ID 1) y usuario (ID 4)
        // Según tu tabla: 1=admin, 4=Usuario
        
        const roleMap = {
          1: 'admin',           // ID 1 = admin
          4: 'usuario'          // ID 4 = usuario
        };
        
        // Obtener el nombre del rol basado en rol_id
        const rolId = data.rol_id || 4; // Default a usuario (ID 4)
        const rolNombre = roleMap[rolId] || 'usuario';
        
        console.log(`🔍 Rol detectado: ID ${rolId} → "${rolNombre}"`);
        console.log(`👤 Usuario: ${data.nombre} (${data.correo})`);

        // 🔥 CREAR USUARIO ADAPTADO PARA FRONTEND
        const usuarioAdaptado = {
          id: data.id || 1,
          nombre: data.nombre || 'Usuario',
          email: data.correo || formData.email,
          // 🔥 ESTO ES LO MÁS IMPORTANTE: Asignar rol correctamente
          rol: rolNombre,
          rol_id: rolId, // Guardar también el ID
          telefono: data.telefono || null,
          direccion: data.direccion || null
        };

        console.log('👤 Usuario adaptado para frontend:', usuarioAdaptado);
        console.log(`✅ ${usuarioAdaptado.nombre} es ${usuarioAdaptado.rol}`);

        // 🔥 GUARDAR EN LOCALSTORAGE Y CONTEXTO
        localStorage.setItem('usuario', JSON.stringify(usuarioAdaptado));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Debug: verificar que se guardó
        const savedUser = localStorage.getItem('usuario');
        console.log('💾 Guardado en localStorage:', savedUser);
        
        // Actualizar contexto
        login(usuarioAdaptado);
        
        // 🔥 REDIRECCIÓN
        console.log('🔄 Redirigiendo a /');
        
        // Redirección principal
        navigate('/');
        
        // Redirección forzada como backup
        setTimeout(() => {
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
          setError(`Error del servidor (${response.status})`);
        }
      }
      
    } catch (error) {
      console.error('Error de conexión completo:', error);
      setError('No se pudo conectar con el servidor. Verifica que el backend esté corriendo en http://localhost:8081');
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
          
          <div className="dev-note">

            
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