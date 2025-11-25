import React from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header"; // ← Importar Header

const PRODUCTS = [
  {
    id: "t-1",
    title: "Cartas Brecha Paradojica",
    price: "$12.000",
    img: "/Img/cartasPkm.jpg",
    imgAlt: "Pack cartas Brecha Paradojica",
    details: ["1 Paquete", "Envío dentro de las 24 horas", "Kit Básico"],
    headerClass: "bg-primary text-white",
    btnClass: "btn-primary"
  }
];

export default function Cartas() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      {/* Header agregado aquí */}
      <Header />
      
      <main className="paginas container my-5" aria-labelledby="cartas-heading">
        <h1 id="cartas-heading">Cartas</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3" aria-live="polite">
          {PRODUCTS.map(p => (
            <div className="col" key={p.id}>
              <CardProduct
                {...p}
                onAdd={() => {
                  console.log("DEBUG Cartas.jsx: addToCart ->", "product:", p);
                  addToCart({
                    id: p.id,
                    name: p.title,
                    image: p.img,
                    price: parsePrice(p.price)
                  });
                  console.log("DEBUG Cartas.jsx: addToCart called");
                }}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}