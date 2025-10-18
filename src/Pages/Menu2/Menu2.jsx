
import React from "react";
import { Link } from "react-router-dom";
import CarouselMenu from "./CarouselMenu2";
import "./Menu2.css";

export default function Menu() {
  return (
    <div>
      {/* Carrusel */}
      <CarouselMenu />

      {/* Cards de productos */}
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/cartasPkm.jpg" alt="CartasPkm" />
              <div className="card-header bg-primary text-white">
                Cartas Brecha Paradojica
              </div>
              <div className="card-body">
                <h2 className="card-title">$12.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">1 Paquete</li>
                  <li className="list-group-item">Envío dentro de las 24 horas</li>
                  <li className="list-group-item">Kit Básico</li>
                </ul>
                <button className="btn btn-primary">Agregar</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/jujutsuKaisen.jpg" alt="jujutsu Kaisen" />
              <div className="card-header bg-success text-white">
                Manga Jujutsu Kaisen Volumen 2
              </div>
              <div className="card-body">
                <h2 className="card-title">$14.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">192 páginas</li>
                  <li className="list-group-item">Envío dentro de 2 días</li>
                  <li className="list-group-item">5 Disponibles</li>
                </ul>
                <button className="btn btn-success">Agregar</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/XboxX.png" alt="Xbox Series X" />
              <div className="card-header bg-warning text-white">
                Xbox Series X
              </div>
              <div className="card-body">
                <h2 className="card-title">$300.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Membresía incluida</li>
                  <li className="list-group-item">Envío dentro de las 24 horas</li>
                  <li className="list-group-item">Membresía Xbox 2 meses</li>
                </ul>
                <button className="btn btn-warning">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Más productos destacados */}
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-4 g-4 mt-2">
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/Gba.avif" alt="Gba" />
              <div className="card-header bg-info text-white">
                Game Boy Advance
              </div>
              <div className="card-body">
                <h2 className="card-title">$80.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Incluye 2 juegos</li>
                  <li className="list-group-item">Envío gratis</li>
                  <li className="list-group-item">Color morado</li>
                </ul>
                <button className="btn btn-info">Agregar</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/MiniLevi.avif" alt="Mini Levi" />
              <div className="card-header bg-secondary text-white">
                Figura Mini Levi
              </div>
              <div className="card-body">
                <h2 className="card-title">$25.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Altura 10cm</li>
                  <li className="list-group-item">Material PVC</li>
                  <li className="list-group-item">Edición limitada</li>
                </ul>
                <button className="btn btn-secondary">Agregar</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/Play5.jpg" alt="PS5" />
              <div className="card-header bg-dark text-white">
                PlayStation 5
              </div>
              <div className="card-body">
                <h2 className="card-title">$500.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Incluye 1 control</li>
                  <li className="list-group-item">Envío gratis</li>
                  <li className="list-group-item">Edición estándar</li>
                </ul>
                <button className="btn btn-dark">Agregar</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/Gojo.jpg" alt="Gojo Funko" />
              <div className="card-header bg-warning text-white">
                 Figura Gojo
              </div>
              <div className="card-body">
                <h2 className="card-title">$18.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Edición especial</li>
                  <li className="list-group-item">Caja original</li>
                  <li className="list-group-item">Altura 9cm</li>
                </ul>
                <button className="btn btn-warning">Agregar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
