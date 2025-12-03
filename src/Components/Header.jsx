import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import PeCarro from "./PeCarro";
import { useAuth } from "../context/AuthContext";
import UserMenu from './UserMenu';
import { isAdmin } from "../Constant/roles"; // ✅ Importa la función

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  // 🔥 Usa la función isAdmin importada (más robusta)
  const usuarioEsAdmin = isAdmin(user);

  // 🔥 Obtener nombre de usuario para mostrar
  const nombreUsuario = user?.nombre || user?.email || 'Usuario';

  return (
    <header style={{ border: 'none', margin: 0, padding: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" 
           style={{ border: 'none', margin: 0, padding: 0 }}>
        <div className="container-fluid" style={{ border: 'none', margin: 0, padding: 0 }}>
          {/* Logo y nombre */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img 
              src="/Img/Elrincon.png" 
              alt="El Rincón Inalámbrico" 
              width="60" 
              height="60" 
              className="me-2"
            />
            <span className="brand-text">El Rincón Inalámbrico</span>
            {/* 🔥 Badge para admin */}
            {usuarioEsAdmin && (
              <span className="badge bg-danger ms-2" style={{ 
                fontSize: '0.6rem',
                animation: 'pulse 2s infinite'
              }}>
                ADMIN
              </span>
            )}
          </Link>

          <button
            className={`navbar-toggler ${open ? 'open' : ''}`}
            type="button"
            aria-controls="navbarNav"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${open ? 'show' : ''}`}
            id="navbarNav"
            style={{ border: 'none' }}
          >
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={() => setOpen(false)}>
                  Inicio
                </Link>
              </li>
              
              {/* 🔥 MENÚ DIFERENTE SEGÚN ROL */}
              {usuarioEsAdmin ? (
                // 🔥 ENLACES PARA ADMINISTRADOR
                <>
                  <li className="nav-item">
                    <Link className="nav-link admin-link" to="/admin/panel" onClick={() => setOpen(false)}>
                      <span className="admin-icon">🏠</span> Panel Admin
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link admin-link" to="/admin/usuarios" onClick={() => setOpen(false)}>
                      <span className="admin-icon">👥</span> Usuarios
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link admin-link" to="/admin/productos" onClick={() => setOpen(false)}>
                      <span className="admin-icon">📦</span> Productos
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link admin-link" to="/admin/ventas" onClick={() => setOpen(false)}>
                      <span className="admin-icon">📊</span> Ventas
                    </Link>
                  </li>
                </>
              ) : (
                // 🔥 ENLACES PARA USUARIO NORMAL (o no logueado)
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/mangas" onClick={() => setOpen(false)}>
                      Mangas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/figuras" onClick={() => setOpen(false)}>
                      Figuras
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/consolas" onClick={() => setOpen(false)}>
                      Consolas
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cartas" onClick={() => setOpen(false)}>
                      Cartas
                    </Link>
                  </li>
                </>
              )}
              
              {/* Enlace de login solo si NO hay usuario */}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={() => setOpen(false)}>
                    Iniciar sesión
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* 🔥 INFO DEL USUARIO (solo si está logueado) */}
          {user && (
            <div className="d-flex align-items-center ms-3">
              <div className="user-info me-3" style={{ 
                fontSize: '0.85rem',
                color: '#ddd',
                textAlign: 'right'
              }}>
                <div><strong>{nombreUsuario}</strong></div>
                <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>
                  {usuarioEsAdmin ? '👑 Administrador' : '👤 Usuario'}
                </div>
              </div>
              <PeCarro />
              <UserMenu />
            </div>
          )}
          
          {/* Si no está logueado, mostrar solo carrito */}
          {!user && (
            <div className="d-flex align-items-center ms-3">
              <PeCarro />
            </div>
          )}
        </div>
      </nav>

      {/* 🔥 BANNER ESPECIAL PARA ADMIN (solo en desktop) */}
      {usuarioEsAdmin && (
        <div className="admin-banner d-none d-lg-block" style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '8px 0',
          fontSize: '14px',
          borderBottom: '2px solid #e74c3c'
        }}>
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                <strong>⚡ Panel de Administración:</strong> 
                Tienes acceso completo al sistema
              </span>
              <div>
                <Link to="/admin/config" className="text-white me-3" style={{ 
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}>
                  ⚙️ Configuración
                </Link>
                <Link to="/admin/reportes" className="text-white" style={{ 
                  textDecoration: 'none',
                  transition: 'color 0.3s'
                }}>
                  📈 Reportes
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        .admin-link {
          font-weight: 500 !important;
          color: #ffcc00 !important;
        }
        .admin-icon {
          margin-right: 5px;
        }
      `}</style>
    </header>
  );
}