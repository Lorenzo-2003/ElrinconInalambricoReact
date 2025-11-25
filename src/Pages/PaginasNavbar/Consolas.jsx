import React from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header"; // ← Importar Header

const PRODUCTS = [
  {
    id: "c-1",
    title: "Xbox Series X",
    price: "$300.000",
    img: "/Img/XboxX.png",
    imgAlt: "Xbox Series X",
    details: ["Membresía incluida", "Envío dentro de las 24 horas"],
    headerClass: "bg-dark text-white",
    btnClass: "btn-dark"
  }
];

export default function Consolas() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      {/* Header agregado aquí */}
      <Header />
      
      <main className="paginas container my-5" aria-labelledby="consolas-heading">
        <h1 id="consolas-heading">Consolas</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3" aria-live="polite">
          {PRODUCTS.map(p => (
            <div className="col" key={p.id}>
              <CardProduct
                {...p}
                onAdd={() => {
                  console.log("DEBUG Consolas.jsx: addToCart ->", "product:", p);
                  addToCart({
                    id: p.id,
                    name: p.title,
                    image: p.img,
                    price: parsePrice(p.price)
                  });
                  console.log("DEBUG Consolas.jsx: addToCart called");
                }}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}