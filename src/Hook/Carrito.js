
import { useEffect, useMemo, useState } from "react";
import { db } from "../src/Data/db"; // <-- asegúrate que db.js esté en src/data/db.js

const STORAGE_KEY = "cart";

export const useCart = () => {
  const initialCart = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const [data] = useState(db); // catálogo
  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5; // ajusta si quieres permitir más por producto
  const MIN_ITEMS = 1;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(product) {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        return prev.map((it, i) =>
          i === idx ? { ...it, quantity: Math.min(MAX_ITEMS, (it.quantity || 1) + 1) } : it
        );
      } else {
        const item = {
          id: product.id,
          name: product.name ?? product.title,
          image: product.image ?? product.img ?? "", // espera "audifono01" (sin prefijo ni extensión)
          price: product.price ?? product.priceNum ?? 0,
          quantity: 1
        };
        return [...prev, item];
      }
    });
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id));
  }

  function increaseQuantity(id) {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.min(MAX_ITEMS, item.quantity + 1) } : item))
    );
  }

  function decreaseQuantity(id) {
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: Math.max(MIN_ITEMS, item.quantity - 1) } : item))
    );
  }

  function clearCart() {
    setCart([]);
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const totalItems = useMemo(() => cart.reduce((s, it) => s + (it.quantity || 0), 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
    totalItems,
  };
};

export default useCart;