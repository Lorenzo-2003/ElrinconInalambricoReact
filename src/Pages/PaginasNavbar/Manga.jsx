import React, { useState, useEffect } from "react";
import CardProduct from "../../Components/CardProduct";
import useCart from "../../hooks/Carrito";
import "./EstilodePaginas.css";
import Header from "../../Components/Header"; // ← Importar Header
import { apiService } from "../../services/api";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to normalize image paths to match actual files
  const normalizeImagePath = (imgPath) => {
    if (!imgPath) return "/Img/placeholder.jpg";

    // Map API img paths to actual file names
    const imageMap = {
      "/Img/jujutsuKaisen.jpg": "/Img/jujutsu kaisen.jpg",
      "/Img/Dragon ball super Vol18.png": "/Img/dragonball super.png",
      "/Img/one piece.jpg": "/Img/one piece.jpg"
    };

    return imageMap[imgPath] || imgPath;
  };

  // Function to add default images based on product names
  const addDefaultImages = (products) => {
    const nameToImageMap = {
      "Gachiakuta": "/Img/manga gachiakuta.png",
      "Hunter x Hunter": "/Img/manga hunter x hunter.jpg",
      "Komi-san": "/Img/manga komi san.jpg",
      "Boruto": "/Img/mangaboruto.jpg",
      "Spy x Family": "/Img/mangacajaazul.jpg",
      "Your Name": "/Img/mangayourname.jpg"
    };

    return products.map(p => ({
      ...p,
      img: p.img || nameToImageMap[p.nombre] || "/Img/placeholder.jpg"
    }));
  };

  console.log('DEBUG: Manga component rendered');
  console.log('DEBUG: addToCart function:', typeof addToCart, addToCart ? 'available' : 'null/undefined');

  // Log hook status
  console.log('DEBUG: addToCart function:', typeof addToCart, addToCart ? 'available' : 'null/undefined');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('DEBUG: Fetching products from API...');
        const data = await apiService.catalogo.getProductos();
        console.log('DEBUG: API Response:', data);

        // Filter products by category for manga (categoria.id = 1 for Manga)
        const mangaProducts = data.filter(product =>
          product.categoria && product.categoria.id === 1
        );

        console.log('DEBUG: Filtered manga products:', mangaProducts);
        if (mangaProducts && mangaProducts.length > 0) {
          setProducts(addDefaultImages(mangaProducts));
        } else {
          // Use fallback if no manga products from API
          setProducts([
            {
              id: 1,
              nombre: "Jujutsu Kaisen Vol.1",
              precio: 14.49,
              stock: 42,
              categoria: { nombre: "Manga", id: 1 },
              img: "/Img/jujutsu kaisen.jpg"
            },
            {
              id: 2,
              nombre: "Dragon Ball Super Vol.1",
              precio: 15.99,
              stock: 38,
              categoria: { nombre: "Manga", id: 1 },
              img: "/Img/dragonball super.png"
            },
            {
              id: 3,
              nombre: "One Piece Vol.1",
              precio: 12.99,
              stock: 50,
              categoria: { nombre: "Manga", id: 1 },
              img: "/Img/one piece.jpg"
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
            id: 1,
            nombre: "Jujutsu Kaisen Vol.1",
            precio: 14.49,
            stock: 42,
            categoria: { nombre: "Manga", id: 1 },
            img: "/Img/jujutsu kaisen.jpg"
          },
          {
            id: 2,
            nombre: "Dragon Ball Super Vol.1",
            precio: 15.99,
            stock: 38,
            categoria: { nombre: "Manga", id: 1 },
            img: "/Img/dragonball super.png"
          },
          {
            id: 3,
            nombre: "One Piece Vol.1",
            precio: 12.99,
            stock: 50,
            categoria: { nombre: "Manga", id: 1 },
            img: "/Img/one piece.jpg"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
                  description={p.descripcion}
                  stock={p.stock}
                  onAdd={() => {
                    try {
                      console.log("DEBUG Manga.jsx: Adding to cart:", p);
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