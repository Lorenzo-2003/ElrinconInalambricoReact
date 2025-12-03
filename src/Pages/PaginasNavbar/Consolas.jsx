import React, { useState, useEffect } from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header";
import { apiService } from "../../services/api";

export default function Consolas() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to add default images based on product names
  const addDefaultImages = (products) => {
    const nameToImageMap = {
      "Nintendo Switch OLED Deluxe": "/Img/consola switch dosdeluxe.jpg",
      "Retro Gaming Console": "/Img/consolasretrogaming.png",
      "Xbox 360": "/Img/consolasxbox360.png",
      "Nintendo 64": "/Img/nintendosesentaycuatro.jpg",
      "Joystick Atari": "/Img/joystickatari.jpg"
    };

    return products.map(p => ({
      ...p,
      img: p.img || nameToImageMap[p.nombre] || "/Img/placeholder.jpg"
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('DEBUG: Fetching products for Consolas...');
        const data = await apiService.catalogo.getProductos();
        console.log('DEBUG: API Response:', data);

        // Filter products by category for consolas (categoria.id = 3 for Consolas)
        const consolasProducts = data.filter(product =>
          product.categoria && product.categoria.id === 3
        );

        console.log('DEBUG: Filtered consolas products:', consolasProducts);
        if (consolasProducts && consolasProducts.length > 0) {
          setProducts(addDefaultImages(consolasProducts));
        } else {
          // Use fallback if no consolas products from API
          setProducts([
            {
              id: 17,
              nombre: "Nintendo Switch OLED",
              precio: 349.99,
              stock: 15,
              categoria: { nombre: "Consolas", id: 3 },
              img: "/Img/switch2.jpg"
            },
            {
              id: 18,
              nombre: "PlayStation 5",
              precio: 499.99,
              stock: 10,
              categoria: { nombre: "Consolas", id: 3 },
              img: "/Img/Play5.jpg"
            },
            {
              id: 19,
              nombre: "Xbox Series X",
              precio: 479.99,
              stock: 12,
              categoria: { nombre: "Consolas", id: 3 },
              img: "/Img/xboxchingona.png"
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
            id: 17,
            nombre: "Nintendo Switch OLED",
            precio: 349.99,
            stock: 15,
            categoria: { nombre: "Consolas", id: 3 },
            img: "/Img/switch2.jpg"
          },
          {
            id: 18,
            nombre: "PlayStation 5",
            precio: 499.99,
            stock: 10,
            categoria: { nombre: "Consolas", id: 3 },
            img: "/Img/Play5.jpg"
          },
          {
            id: 19,
            nombre: "Xbox Series X",
            precio: 479.99,
            stock: 12,
            categoria: { nombre: "Consolas", id: 3 },
            img: "/Img/xboxchingona.png"
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
        <h1>Consolas</h1>
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
                  description={p.descripcion}
                  stock={p.stock}
                  onAdd={() => {
                    try {
                      console.log("DEBUG Consolas.jsx: Adding to cart:", p);
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