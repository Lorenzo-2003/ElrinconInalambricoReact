import React from "react";
import CardProduct from "../../Components/CardProduct";
import "./EstilodePaginas.css"; 
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
  return (
    <main className="paginas container my-5" aria-labelledby="cartas-heading">
      <h1 id="cartas-heading">Cartas</h1>
      <section className="row row-cols-1 row-cols-md-3 g-4 mt-3" aria-live="polite">
        {PRODUCTS.map(p => (
          <div className="col" key={p.id}>
            <CardProduct {...p} />
          </div>
        ))}
      </section>
    </main>
  );
}
