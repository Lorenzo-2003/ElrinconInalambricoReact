import React from "react";
import CarouselMenu from "./CarouselMenu2";
import "./Menu2.css";
import useCart from "../../hooks/Carrito";

export default function Menu2() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      <CarouselMenu />

      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/cartasPkm.jpg" alt="CartasPkm" />
              <div className="card-header bg-primary text-white">Cartas Brecha Paradojica</div>
              <div className="card-body">
                <h2 className="card-title">$12.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">1 Paquete</li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    console.log("DEBUG Menu2.jsx: addToCart (Cartas) ->", addToCart);
                    addToCart({
                      id: "t-1",
                      name: "Cartas Brecha Paradojica",
                      image: "/Img/cartasPkm.jpg",
                      price: parsePrice("$12.000")
                    });
                    console.log("DEBUG Menu2.jsx: addToCart called (Cartas)");
                  }}
                >
                  Agregar
                </button>
              </div>
            </div>
          </div>

          {/* Repite el patrón para otras tarjetas si las necesitas */}
        </div>
      </div>
    </div>
  );
}