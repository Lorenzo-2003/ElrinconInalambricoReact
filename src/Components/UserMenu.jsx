import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  if (!user) return null;

  return (
    <div className="user-menu" ref={ref} style={{ position: 'relative' }}>
      <button
        className="btn btn-link user-icon"
        onClick={() => setOpen((v) => !v)}
        aria-label="Abrir menú de usuario"
      >
        <img src="/Img/iconousuario.webp" className="user-icon" style={{ width: 44, height: 44 }} alt="Usuario" />
      </button>

      {open && (
        <div className="card user-card" style={{ position: 'absolute', right: 0, top: '56px', zIndex: 1000, minWidth: 220 }}>
          <div className="card-body p-3">
            <div className="d-flex align-items-center mb-2">
              <img src="/Img/iconousuario.webp" className="user-icon me-2 rounded" style={{ width: 40, height: 40 }} alt="avatar" />
              <div>
                <div className="fw-bold">{user.nombre || user.email}</div>
                <div className="small text-muted">{user.rol || 'cliente'}</div>
              </div>
            </div>

            <div className="mb-2 small text-muted">{user.email}</div>

            <div className="d-grid gap-2">
              <button className="btn btn-outline-primary btn-sm" onClick={() => alert('Ver perfil (pendiente)')}>Ver perfil</button>
                  <button className="btn btn-danger btn-sm" onClick={() => { logout(); navigate('/'); }}>Cerrar sesión</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
