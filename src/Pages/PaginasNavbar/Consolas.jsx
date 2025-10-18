import React from "react";
import CardProduct from "../../Components/CardProduct";
import "./EstilodePaginas.css"; 
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
  return (
    <main className="paginas container my-5" aria-labelledby="consolas-heading">
      <h1 id="consolas-heading">Consolas</h1>
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