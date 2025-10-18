<<<<<<< HEAD

=======
>>>>>>> 22c0aa866fa65abdb558cd25180a081a959b4ed0
import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
export default function Menu() {
  return (
    <div className="menu-bg">
      <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/Img/Elrincon.png" alt="El Rincón" width="100" height="100" className="me-2" />
            El Rincón Inalámbrico
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mangas">Mangas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/figuras">Figuras</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/consolas">Consolas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cartas">Cartas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
            </ul>
          </div>
        </div>
      </nav>
<<<<<<< HEAD
    
=======
>>>>>>> 22c0aa866fa65abdb558cd25180a081a959b4ed0
    </div>
  );
}