import React from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header"; // ← Importar Header

const PRODUCTS = [
  {
    id: "f-1",
    title: "Figura Mini Levi",
    price: "$25.000",
    img: "/Img/MiniLevi.avif",
    details: ["Altura 10cm", "Material PVC", "Edición limitada"],
    headerClass: "bg-secondary text-white",
    btnClass: "btn-secondary"
  },
  {
    id: "f-2",
    title: "Figura Gojo",
    price: "$18.000",
    img: "/Img/Gojo.jpg",
    details: ["Altura 9cm", "Edición especial"],
    headerClass: "bg-warning text-white",
    btnClass: "btn-warning"
  },
  {
    id: "f-3",
    title: "Figura One Piece [Luffy]",
    price: "$30.000",
    img: "/Img/OneFigura.jpg",
    details: ["PVC", "Altura 15cm"],
    headerClass: "bg-info text-white",
    btnClass: "btn-info"
  }
  
];

export default function Figuras() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      {/* Header agregado aquí */}
      <Header />
      
      <main className="paginas container my-5" aria-labelledby="figuras-heading">
        <h1 id="figuras-heading">Figuras</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3" aria-live="polite">
          {PRODUCTS.map(p => (
            <div className="col" key={p.id}>
              <CardProduct
                {...p}
                onAdd={() => {
                  console.log("DEBUG Figuras.jsx: addToCart ->", "product:", p);
                  addToCart({
                    id: p.id,
                    name: p.title,
                    image: p.img,
                    price: parsePrice(p.price)
                  });
                  console.log("DEBUG Figuras.jsx: addToCart called");
                }}
              />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}