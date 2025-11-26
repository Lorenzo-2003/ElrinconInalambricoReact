import React from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header"; // ← Importar Header

const PRODUCTS = [
  { 
    id: "m-1",
    title: "Jujutsu Kaisen Vol.2", 
    price: "$14.000", 
    img: "/Img/jujutsuKaisen.jpg", 
    details: ["192 páginas"], 
    headerClass: "bg-success text-white", 
    btnClass: "btn-success" 
  },  {
      id: "m-2",
    title: "Dragon ball Super Vol.1", 
    price: "$15.000", 
    img: "/Img/Dragon ball super Vol18.png", 
    details: ["192 páginas"], 
    headerClass: "bg-success text-white", 
    btnClass: "btn-success" 
    },{
      id: "m-3",
    title: "Komi-san wa Komyushou Desu Vol.5", 
    price: "$14.000", 
    img: "/Img/Komi-san.jpg", 
    details: ["400 páginas"], 
    headerClass: "bg-success text-white", 
    btnClass: "btn-success" 
  }
];

export default function Manga() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      {/* Header agregado aquí */}
      <Header />
      
      <main className="paginas container my-5">
        <h1>Mangas</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {PRODUCTS.map(p => (
            <div className="col" key={p.id}>
              <CardProduct
                {...p}
                onAdd={() => {
                  console.log("DEBUG Manga.jsx: addToCart ->", addToCart, "product:", p);
                  addToCart({ id: p.id, name: p.title, image: p.img, price: parsePrice(p.price) });
                  console.log("DEBUG Manga.jsx: addToCart called");
                }}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}