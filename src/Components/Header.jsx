import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import PeCarro from "./PeCarro";
import { useAuth } from "../context/AuthContext";
import UserMenu from './UserMenu';

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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
              <li className="nav-item"><Link className="nav-link" to="/" onClick={() => setOpen(false)}>Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mangas" onClick={() => setOpen(false)}>Mangas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/figuras" onClick={() => setOpen(false)}>Figuras</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/consolas" onClick={() => setOpen(false)}>Consolas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cartas" onClick={() => setOpen(false)}>Cartas</Link></li>
              {!user && (
                <li className="nav-item"><Link className="nav-link" to="/login" onClick={() => setOpen(false)}>Iniciar sesión</Link></li>
              )}
            </ul>

            {/* previously the actions were here; moved outside collapse for mobile usability */}
          </div>

          {/* acciones siempre visibles: carrito + usuario fuera del collapse */}
          <div className="header-actions d-flex align-items-center ms-3">
            <PeCarro />
            {user && <UserMenu />}
          </div>
        </div>
      </nav>
    </header>
  );
}