import React from "react";
import CardProduct from "../../Components/CardProduct";
import "./EstilodePaginas.css"; 
const PRODUCTS = [
  {
    id: "m-1",
    title: "Jujutsu Kaisen Volumen 2",
    price: "$14.000",
    img: "/Img/jujutsuKaisen.jpg",
    imgAlt: "Portada Jujutsu Kaisen Vol.2",
    details: ["192 páginas", "Envío dentro de 2 días", "5 Disponibles"],
    headerClass: "bg-success text-white",
    btnClass: "btn-success"
  },
  {
    id: "m-2",
    title: "Naruto Vol.31",
    price: "$13.000",
    img: "/Img/Naruto.jpg",
    imgAlt: "Portada Naruto Vol.31",
    details: ["200 páginas", "Envío 48 horas"],
    headerClass: "bg-warning text-white",
    btnClass: "btn-warning"
  }
];

export default function Manga() {
  return (
    <main className="paginas container my-5" aria-labelledby="mangas-heading">
      <h1 id="mangas-heading">Mangas</h1>
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
