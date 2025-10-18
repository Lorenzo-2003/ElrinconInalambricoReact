import React from "react";
import CardProduct from "../../Components/CardProduct";
import "./EstilodePaginas.css"; 
const PRODUCTS = [
  {
    id: "f-1",
    title: "Figura Mini Levi",
    price: "$25.000",
    img: "/Img/MiniLevi.avif",
    imgAlt: "Figura Mini Levi",
    details: ["Altura 10cm", "Material PVC", "Edición limitada"],
    headerClass: "bg-secondary text-white",
    btnClass: "btn-secondary"
  }
];

export default function Figuras() {
  return (
    <main className="paginas container my-5" aria-labelledby="figuras-heading">
      <h1 id="figuras-heading">Figuras</h1>
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