import React, { useState, useEffect } from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header";
import { apiService } from "../../services/api";

export default function Cartas() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to add default images based on product names
  const addDefaultImages = (products) => {
    const nameToImageMap = {
      "Yu-Gi-Oh!": "/Img/cartas yu gi oh.jpeg",
      "Pokémon Lugia": "/Img/cartasLugiaPokemon.jpg",
      "League of Legends": "/Img/cartaslol.jpg",
      "Sobre de Cartas": "/Img/sobre de cartas.jpg",
      "Cartas juego de tronos": "/Img/Cartas juego de tronos.jpg",
      "Mitos y Leyendas": "/Img/cartas mitos y leyendas.webp"
    };

    return products.map(p => ({
      ...p,
      img: p.img || nameToImageMap[p.nombre] || "/Img/placeholder.jpg"
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('DEBUG: Fetching products for Cartas...');
        const data = await apiService.catalogo.getProductos();
        console.log('DEBUG: API Response:', data);

        // Filter products by category for cartas (categoria.id = 4 for Cartas)
        const cartasProducts = data.filter(product =>
          product.categoria && product.categoria.id === 4
        );

        console.log('DEBUG: Filtered cartas products:', cartasProducts);
        if (cartasProducts && cartasProducts.length > 0) {
          setProducts(addDefaultImages(cartasProducts));
        } else {
          // Use fallback if no cartas products from API
          setProducts([
            {
              id: 25,
              nombre: "Colección Pokémon Base Set",
              precio: 29.99,
              stock: 40,
              categoria: { nombre: "Cartas", id: 4 },
              img: "/Img/cartaspkm.jpg"
            },
            {
              id: 26,
              nombre: "Yu-Gi-Oh! Structure Deck",
              precio: 19.99,
              stock: 35,
              categoria: { nombre: "Cartas", id: 4 },
              img: "/Img/yugiohdragondelcielo.jpeg"
            },
            {
              id: 32,
              nombre: "Exploding Kittens",
              precio: 19.99,
              stock: 45,
              categoria: { nombre: "Cartas", id: 4 },
              img: "/Img/wata.jpg"
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
            id: 25,
            nombre: "Colección Pokémon Base Set",
            precio: 29.99,
            stock: 40,
            categoria: { nombre: "Cartas", id: 4 },
            img: "/Img/cartaspkm.jpg"
          },
          {
            id: 26,
            nombre: "Yu-Gi-Oh! Structure Deck",
            precio: 19.99,
            stock: 35,
            categoria: { nombre: "Cartas", id: 4 },
            img: "/Img/yugiohdragondelcielo.jpeg"
          },
          {
            id: 32,
            nombre: "Exploding Kittens",
            precio: 19.99,
            stock: 45,
            categoria: { nombre: "Cartas", id: 4 },
            img: "/Img/cartas.jpg"
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
        <h1>Cartas</h1>
        <section className="row row-cols-1 row-cols-md-3 g-4 mt-3">
          {loading ? (
            <div className="text-center w-100">Cargando productos...</div>
          ) : error ? (
            <div className="text-center w-100 text-danger">{error}</div>
          ) : (
            products.map(p => (
              <div className="col" key={p.id}>
                <CardProduct
                  img={p.img}
                  title={p.nombre}
                  price={p.precio}
                  stock={p.stock}
                  onAdd={() => {
                    try {
                      console.log("DEBUG Cartas.jsx: Adding to cart:", p);
                      addToCart({
                        id: p.id,
                        name: p.nombre,
                        image: p.img,
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