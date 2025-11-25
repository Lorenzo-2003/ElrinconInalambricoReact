import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import PeCarro from "./PeCarro";

export default function Header() {
  return (
    <header style={{ border: 'none', margin: 0, padding: 0 }}>
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom" 
           style={{ border: 'none', margin: 0, padding: 0 }}>
        <div className="container-fluid" style={{ border: 'none', margin: 0, padding: 0 }}>
          {/* Logo y nombre */}
          <Link className="navbar-brand d-flex align-items-center" to="/Menu2">
            <img 
              src="/Img/Elrincon.png" 
              alt="El Rincón Inalámbrico" 
              width="60" 
              height="60" 
              className="me-2"
            />
            <span className="brand-text">El Rincón Inalámbrico</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>


          <div className="collapse navbar-collapse" id="navbarNav" style={{ border: 'none' }}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to="/Menu2">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mangas">Mangas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/figuras">Figuras</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/consolas">Consolas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cartas">Cartas</Link></li>
              
            </ul>
          <Link className="navbar-brand d-flex align-items-center" to="/Menu2">
            <img
              src="/Img/iconousuario.webp" 
              width="90" 
              height="60" 
              className="me-2"
            />
          </Link>
            <div className="d-flex align-items-center ms-3">
              <PeCarro />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}