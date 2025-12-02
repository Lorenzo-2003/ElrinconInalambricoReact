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

      {/* Cards de productos */}
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/cartaspkm.jpg" alt="CartasPkm" />
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => {
                    // quick UI guard: use a data attribute to prevent duplicate clicks
                    // while keeping the button visually enabled.
                    const btn = e.currentTarget;
                    if (btn.dataset.adding === "1") return;
                    btn.dataset.adding = "1";
                    btn.setAttribute("aria-busy", "true");
                    setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (Cartas) ->", addToCart);
                    addToCart({
                      id: "t-1",
                      name: "Cartas Brecha Paradojica",
                      image: "/Img/cartasPkm.jpg",
                      price: parsePrice("$12.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (Cartas)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={(e) => {
                    const btn = e.currentTarget; if (btn.dataset.adding === "1") return; btn.dataset.adding = "1"; btn.setAttribute("aria-busy", "true"); setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (Jujutsu) ->", addToCart);
                    addToCart({
                      id: "m-jujutsu-2",
                      name: "Jujutsu Kaisen Vol.2",
                      image: "/Img/jujutsuKaisen.jpg",
                      price: parsePrice("$14.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (Jujutsu)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={(e) => {
                    const btn = e.currentTarget; if (btn.dataset.adding === "1") return; btn.dataset.adding = "1"; btn.setAttribute("aria-busy", "true"); setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (Xbox) ->", addToCart);
                    addToCart({
                      id: "c-1",
                      name: "Xbox Series X",
                      image: "/Img/XboxX.png",
                      price: parsePrice("$300.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (Xbox)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={(e) => {
                    const btn = e.currentTarget; if (btn.dataset.adding === "1") return; btn.dataset.adding = "1"; btn.setAttribute("aria-busy", "true"); setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (GBA) ->", addToCart);
                    addToCart({
                      id: "gba-1",
                      name: "Game Boy Advance",
                      image: "/Img/Gba.avif",
                      price: parsePrice("$80.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (GBA)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    const btn = e.currentTarget; if (btn.dataset.adding === "1") return; btn.dataset.adding = "1"; btn.setAttribute("aria-busy", "true"); setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (Mini Levi) ->", addToCart);
                    addToCart({
                      id: "f-1",
                      name: "Figura Mini Levi",
                      image: "/Img/MiniLevi.avif",
                      price: parsePrice("$25.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (Mini Levi)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={(e) => {
                    const btn = e.currentTarget; if (btn.dataset.adding === "1") return; btn.dataset.adding = "1"; btn.setAttribute("aria-busy", "true"); setTimeout(() => { try { btn.removeAttribute("data-adding"); btn.removeAttribute("aria-busy"); } catch (err) {} }, 500);
                    console.log("DEBUG Menu.jsx: addToCart (PS5) ->", addToCart);
                    addToCart({
                      id: "ps5-std",
                      name: "PlayStation 5",
                      image: "/Img/Play5.jpg",
                      price: parsePrice("$500.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (PS5)");
                  }}
                >
                  Agregar
                </button>
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
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    console.log("DEBUG Menu.jsx: addToCart (Gojo) ->", addToCart);
                    addToCart({
                      id: "gojo-1",
                      name: "Figura Gojo",
                      image: "/Img/Gojo.jpg",
                      price: parsePrice("$18.000")
                    });
                    console.log("DEBUG Menu.jsx: addToCart called (Gojo)");
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}