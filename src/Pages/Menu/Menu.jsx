import React from "react";
import { Link } from "react-router-dom";
import CarouselMenu from "./CarouselMenu";
import "./Menu.css";
import useCart from "../../hooks/Carrito";
import Header from "../../Components/Header.jsx";

export default function Menu() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      <Header/>
      
      {/* Carrusel */}
      <CarouselMenu />

      {/* PRIMERA FILA DE PRODUCTOS - 3 COLUMNAS */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Productos Destacados</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          
          {/* Carta 1: Cartas Pokémon */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/cartaspkm.jpg" className="card-img-top" alt="Cartas Pokémon Brecha Paradójica" />
              </div>
              <div className="card-header bg-primary text-white text-center">
                <h5 className="card-title mb-0">Cartas Brecha Paradójica</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-primary mb-3">$12.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">1 Paquete</li>
                  <li className="list-group-item">Envío dentro de las 24 horas</li>
                  <li className="list-group-item">Kit Básico</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-primary w-100"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "t-1",
                        name: "Cartas Brecha Paradójica",
                        image: "/Img/cartaspkm.jpg",
                        price: parsePrice("$12.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carta 2: Jujutsu Kaisen */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/jujutsuKaisen.jpg" className="card-img-top" alt="Jujutsu Kaisen Volumen 2" />
              </div>
              <div className="card-header bg-success text-white text-center">
                <h5 className="card-title mb-0">Manga Jujutsu Kaisen Vol. 2</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-success mb-3">$14.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">192 páginas</li>
                  <li className="list-group-item">Envío dentro de 2 días</li>
                  <li className="list-group-item">5 Disponibles</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-success w-100"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "m-jujutsu-2",
                        name: "Jujutsu Kaisen Vol. 2",
                        image: "/Img/jujutsuKaisen.jpg",
                        price: parsePrice("$14.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carta 3: Xbox Series X */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/XboxX.png" className="card-img-top" alt="Xbox Series X" />
              </div>
              <div className="card-header bg-warning text-white text-center">
                <h5 className="card-title mb-0">Xbox Series X</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-warning mb-3">$300.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Membresía incluida</li>
                  <li className="list-group-item">Envío dentro de las 24 horas</li>
                  <li className="list-group-item">Membresía Xbox 2 meses</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-warning w-100"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "c-1",
                        name: "Xbox Series X",
                        image: "/Img/XboxX.png",
                        price: parsePrice("$300.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SEGUNDA FILA DE PRODUCTOS - 4 COLUMNAS */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Más Productos</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          
          {/* Carta 4: Game Boy Advance */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/Gba.avif" className="card-img-top" alt="Game Boy Advance" />
              </div>
              <div className="card-header bg-info text-white text-center">
                <h5 className="card-title mb-0">Game Boy Advance</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-info mb-3">$80.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Incluye 2 juegos</li>
                  <li className="list-group-item">Envío gratis</li>
                  <li className="list-group-item">Color morado</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-info w-100"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "gba-1",
                        name: "Game Boy Advance",
                        image: "/Img/Gba.avif",
                        price: parsePrice("$80.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carta 5: Figura Mini Levi */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/MiniLevi.avif" className="card-img-top" alt="Figura Mini Levi" />
              </div>
              <div className="card-header bg-secondary text-white text-center">
                <h5 className="card-title mb-0">Figura Mini Levi</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-secondary mb-3">$25.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Altura 10cm</li>
                  <li className="list-group-item">Material PVC</li>
                  <li className="list-group-item">Edición limitada</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "f-1",
                        name: "Figura Mini Levi",
                        image: "/Img/MiniLevi.avif",
                        price: parsePrice("$25.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carta 6: PlayStation 5 */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/Play5.jpg" className="card-img-top" alt="PlayStation 5" />
              </div>
              <div className="card-header bg-dark text-white text-center">
                <h5 className="card-title mb-0">PlayStation 5</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-dark mb-3">$500.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Incluye 1 control</li>
                  <li className="list-group-item">Envío gratis</li>
                  <li className="list-group-item">Edición estándar</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-dark w-100 text-white"
                    onClick={(e) => {
                      const btn = e.currentTarget;
                      if (btn.dataset.adding === "1") return;
                      btn.dataset.adding = "1";
                      btn.setAttribute("aria-busy", "true");
                      btn.innerHTML = 'Agregando...';
                      setTimeout(() => {
                        try {
                          btn.removeAttribute("data-adding");
                          btn.removeAttribute("aria-busy");
                          btn.innerHTML = 'Agregar';
                        } catch (err) {}
                      }, 500);
                      
                      addToCart({
                        id: "ps5-std",
                        name: "PlayStation 5",
                        image: "/Img/Play5.jpg",
                        price: parsePrice("$500.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carta 7: Figura Gojo */}
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-img-container">
                <img src="/Img/Gojo.jpg" className="card-img-top" alt="Figura Gojo" />
              </div>
              <div className="card-header bg-danger text-white text-center">
                <h5 className="card-title mb-0">Figura Gojo</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <h3 className="card-title text-center text-danger mb-3">$18.000</h3>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">Edición especial</li>
                  <li className="list-group-item">Caja original</li>
                  <li className="list-group-item">Altura 9cm</li>
                </ul>
                <div className="mt-auto">
                  <button
                    className="btn btn-danger w-100"
                    onClick={() => {
                      addToCart({
                        id: "gojo-1",
                        name: "Figura Gojo",
                        image: "/Img/Gojo.jpg",
                        price: parsePrice("$18.000"),
                        quantity: 1
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}