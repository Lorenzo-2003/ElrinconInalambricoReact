import React from "react";
import { Link } from "react-router-dom";
import CarouselMenu from "./CarouselMenu";
import "./Menu.css";

export default function Menu() {
  return (
    <div className="menu-bg">
      {/* Navbar */}
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
              <li className="nav-item"><Link className="nav-link active" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mangas">Mangas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/figuras">Figuras</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/consolas">Consolas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cartas">Cartas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Carrusel */}
      <CarouselMenu />

      {/* Cards de productos */}
      <div className="container-fluid my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <Link to="/detalle" className="card-link">
              <div className="card h-100 text-center">
                <img src="/Img/cartasPkm.jpg" alt="CartasPkm" />
                <div className="card-header bg-primary text-white">
                  Cartas Brecha Paradojica
                </div>
                <div className="card-body">
                  <h2 className="card-title">$12.000</h2>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">1 Paquete</li>
                    <li className="list-group-item">Envio dentro de las 24 horas</li>
                    <li className="list-group-item">Kit Basico</li>
                  </ul>
                  <button className="btn btn-primary">Agregar</button>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/detalle" className="card-link">
              <div className="card h-100 text-center">
                <img src="/Img/jujutsuKaisen.jpg" alt="jujutsu Kaisen" />
                <div className="card-header bg-success text-white">
                  Manga Jujutsu Kaisen Volumen 2
                </div>
                <div className="card-body">
                  <h2 className="card-title">$14.000</h2>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">192 paginas </li>
                    <li className="list-group-item">Envio dentro de 2 dias</li>
                    <li className="list-group-item">5 Disponibles</li>
                  </ul>
                  <button className="btn btn-success">Agregar</button>
                </div>
              </div>
            </Link>
          </div>
          <div className="col">
            <Link to="/detalle" className="card-link">
              <div className="card h-100 text-center">
                <img src="/Img/XboxX.png" alt="Xbox Series X" />
                <div className="card-header bg-warning text-white">
                  Xbox Series X
                </div>
                <div className="card-body">
                  <h2 className="card-title">$300.000</h2>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item">Membresia incluida</li>
                    <li className="list-group-item">Envio dentro de las 24 horas</li>
                    <li className="list-group-item">membresia Xbox 2 meses</li>
                  </ul>
                  <button className="btn btn-warning">Agregar</button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}