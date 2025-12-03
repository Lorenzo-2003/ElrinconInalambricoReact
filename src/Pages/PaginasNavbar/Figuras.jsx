import React, { useState, useEffect } from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header";
import { apiService } from "../../services/api";

export default function Figuras() {
   const { addToCart } = useCart();
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   // Function to add default images based on product names
   const addDefaultImages = (products) => {
     const nameToImageMap = {
       "Figura de Rem": "/Img/RemFigura.jpeg",
       "Figura de Death Note": "/Img/DeathFigura.jpg",
       "Figura de Demon Slayer": "/Img/figura rengoku.jpg",
       "Figura de One Punch Man": "/Img/MiniLevi.avif",
       "Figura de Jujutsu Kaisen": "/Img/figura gojo.jpg",
       "Spy x Family": "/Img/figuraspyxfamily.jpg",
       "Haikyuu": "/Img/Figura Haikyuu.jpg",
       "Sasuke": "/Img/Figura sasuke.webp",
       "Shinobu": "/Img/figura shinobu.jpg"
     };

     return products.map(p => ({
       ...p,
       img: p.img || nameToImageMap[p.nombre] || "/Img/Elrincon.png"
     })).filter(p => p.img !== "/Img/Elrincon.png");
   };

   useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('DEBUG: Fetching products for Figuras...');
        const data = await apiService.catalogo.getProductos();
        console.log('DEBUG: API Response:', data);

        // Filter products by category for figuras (categoria.id = 2 for Figuras)
        const figurasProducts = data.filter(product =>
          product.categoria && product.categoria.id === 2
        );

        console.log('DEBUG: Filtered figuras products:', figurasProducts);
        if (figurasProducts && figurasProducts.length > 0) {
          setProducts(addDefaultImages(figurasProducts));
        } else {
          // Use fallback if no figuras products from API
          setProducts([
            {
              id: 9,
              nombre: "Figura de Goku",
              precio: 89.99,
              stock: 20,
              categoria: { nombre: "Figuras", id: 2 },
              img: "/Img/gojo.jpg"
            },
            {
              id: 10,
              nombre: "Figura de Naruto",
              precio: 79.99,
              stock: 25,
              categoria: { nombre: "Figuras", id: 2 },
              img: "/Img/minilevi.avif"
            },
            {
              id: 11,
              nombre: "Figura de Luffy",
              precio: 94.99,
              stock: 18,
              categoria: { nombre: "Figuras", id: 2 },
              img: "/Img/onefigura.jpg"
            }
          ]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(`Error loading products: ${err.message}`);
        // Fallback to hardcoded products if API fails
        setProducts([
          {
            id: 9,
            nombre: "Figura de Goku",
            precio: 89.99,
            stock: 20,
            categoria: { nombre: "Figuras", id: 2 },
            img: "/Img/gojo.jpg"
          },
          {
            id: 10,
            nombre: "Figura de Levi Ackerman",
            precio: 79.99,
            stock: 25,
            categoria: { nombre: "Figuras", id: 2 },
            img: "/Img/minilevi.avif"
          },
          {
            id: 11,
            nombre: "Figura de Luffy",
            precio: 94.99,
            stock: 18,
            categoria: { nombre: "Figuras", id: 2 },
            img: "/Img/onefigura.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header />
      <main className="paginas container my-5">
        <h1>Figuras</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {loading ? (
            <div className="text-center w-100">Cargando productos...</div>
          ) : error ? (
            <div className="text-center w-100 text-danger">{error}</div>
          ) : (
            products.map(p => (
              <div className="col" key={p.id}>
                <CardProduct
                  img={p.img || "/Img/placeholder.jpg"}
                  title={p.nombre}
                  price={p.precio}
                  stock={p.stock}
                  onAdd={() => {
                    try {
                      console.log("DEBUG Figuras.jsx: Adding to cart:", p);
                      addToCart({
                        id: p.id,
                        name: p.nombre,
                        image: p.img || "/Img/placeholder.jpg",
                        price: p.precio,
                        stock: p.stock
                      });
                    } catch (error) {
                      console.error("Error adding to cart:", error);
                    }
                  }}
                />
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}