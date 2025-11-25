import { useCallback, useEffect, useMemo, useState } from "react";
import { db } from "../data/db"; // ajusta ruta si tu db está en otro sitio

const STORAGE_KEY = "cart";

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeStorageAndNotify(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    // notifica a otras instancias en la misma pestaña
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
  } catch (e) {
    // console.warn("writeStorage error", e);
  }
}

export default function useCart() {
  const [data] = useState(db || []);
  const [cart, setCart] = useState(() => readStorage());

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // sincronizar desde storage (útil para otras pestañas o para recibir la notificación)
  const syncFromStorage = useCallback(() => {
    setCart(readStorage());
  }, []);

  useEffect(() => {
    window.addEventListener("cartUpdated", syncFromStorage);
    window.addEventListener("storage", syncFromStorage);
    return () => {
      window.removeEventListener("cartUpdated", syncFromStorage);
      window.removeEventListener("storage", syncFromStorage);
    };
  }, [syncFromStorage]);

  function addToCart(item) {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      let next;
      if (idx >= 0) {
        if ((prev[idx].quantity || 1) >= MAX_ITEMS) return prev;
        next = [...prev];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + 1 };
      } else {
        next = [...prev, { ...item, quantity: item.quantity || 1 }];
      }
      writeStorageAndNotify(next);
      return next;
    });
  }

  function removeFromCart(id) {
    setCart(prev => {
      const next = prev.filter(p => p.id !== id);
      writeStorageAndNotify(next);
      return next;
    });
  }

  function increaseQuantity(id) {
    setCart(prev => {
      const next = prev.map(p =>
        p.id === id && (p.quantity || 1) < MAX_ITEMS ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
      writeStorageAndNotify(next);
      return next;
    });
  }

  function decreaseQuantity(id) {
    setCart(prev => {
      const next = prev.map(p =>
        p.id === id && (p.quantity || 1) > MIN_ITEMS ? { ...p, quantity: (p.quantity || 1) - 1 } : p
      );
      writeStorageAndNotify(next);
      return next;
    });
  }

  function clearCart() {
    setCart(() => {
      const next = [];
      writeStorageAndNotify(next);
      return next;
    });
  }

  const isEmpty = useMemo(() => cart.length === 0, [cart]);
  const cartTotal = useMemo(() => cart.reduce((t, i) => t + (i.quantity || 0) * (i.price || 0), 0), [cart]);
  const totalItems = useMemo(() => cart.reduce((s, i) => s + (i.quantity || 0), 0), [cart]);

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    isEmpty,
    cartTotal,
    totalItems
  };
}