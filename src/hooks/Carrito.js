import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { db } from "../Data/db";

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
    window.dispatchEvent(new CustomEvent("cartUpdated", { detail: { cart } }));
  } catch (e) {
    // console.warn("writeStorage error", e);
  }
}

export default function useCart() {
  const instanceIdRef = useRef(Math.random().toString(36).slice(2, 8));
  const instanceId = instanceIdRef.current;
  const [data] = useState(db || []);
  const [cart, setCart] = useState(() => readStorage());
  const isAddingRef = useRef(false); // ⬅️ NUEVO - referencia para controlar

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  // sincronizar desde storage (útil para otras pestañas o para recibir la notificación)
  const syncFromStorage = useCallback(() => {
    const s = readStorage();
    if (typeof window !== 'undefined' && window.__cartDebug) {
      try { console.debug(`[cart:${instanceId}] syncFromStorage ->`, s); } catch (e) {}
    }
    setCart(s);
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
    try {
      window.__cartOperationLock = window.__cartOperationLock || { locked: false };
      if (window.__cartOperationLock.locked) {
        console.debug(`[cart:${instanceId}] addToCart: global op locked - ignoring call for`, item?.id);
        return;
      }
      window.__cartOperationLock.locked = true;
      setTimeout(() => { try { window.__cartOperationLock.locked = false; } catch (e) {} }, 200);
    } catch (e) {
      // ignore
    }
    // Optional debug tracing, enable by setting window.__cartDebug = true in the console
    if (typeof window !== 'undefined' && window.__cartDebug) {
      try { console.debug(`[cart:${instanceId}] addToCart called for`, item && item.id, new Date().toISOString()); console.trace(); } catch (e) {}
    }
    // ⬇️ PREVENIR ejecución duplicada
    if (isAddingRef.current) {
      console.log(`🛑 [cart:${instanceId}] addToCart bloqueado - ya en proceso`);
      return;
    }

    // Global guard (across hook instances) to avoid two rapid calls adding twice
    try {
      const now = Date.now();
      const last = window.__lastAdd || { id: null, ts: 0 };
      if (item && last.id === item.id && now - last.ts < 400) {
        console.debug(`[cart:${instanceId}] addToCart: ignored global duplicate for`, item.id);
        return;
      }
      window.__lastAdd = { id: item?.id ?? null, ts: now };

      // Per-item guard (more robust): keep a map for the last add timestamp per id
      window.__lastAddMap = window.__lastAddMap || {};
      if (item && window.__lastAddMap[item.id] && now - window.__lastAddMap[item.id] < 600) {
        console.debug(`[cart:${instanceId}] addToCart: ignored per-item duplicate for`, item.id);
        return;
      }
      if (item) window.__lastAddMap[item.id] = now;
      // cleanup (best-effort) to prevent map from growing forever
      setTimeout(() => {
        try { if (item) delete window.__lastAddMap[item.id]; } catch (e) {}
      }, 2000);
    } catch (e) {
      // ignore
    }

    isAddingRef.current = true;

    // ATOMIC update: read latest from storage, update, write back.
    // This helps prevent race conditions when multiple hook instances attempt to update at nearly the same time.
    try {
      const current = readStorage();
      const idx = current.findIndex(p => p.id === item.id);
      let next;
      if (idx >= 0) {
        if ((current[idx].quantity || 1) >= MAX_ITEMS) {
          isAddingRef.current = false;
          return;
        }
        next = [...current];
        next[idx] = { ...next[idx], quantity: (next[idx].quantity || 1) + 1 };
      } else {
        next = [...current, { ...item, quantity: 1 }]; // always add quantity:1
      }
      // Safety: normalize next so we don't accidentally keep duplicate entries with same id
      // This merges any duplicates into single items summing their quantities.
      const normalized = [];
      for (const it of next) {
        const found = normalized.find(x => x.id === it.id);
        if (found) {
          found.quantity = (found.quantity || 0) + (it.quantity || 0);
        } else {
          normalized.push({ ...it });
        }
      }

      // write back to persistent storage and notify other instances
      writeStorageAndNotify(normalized);
      // make sure local react state reflects the source of truth from storage
      setCart(normalized);
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.debug(`[cart:${instanceId}] addToCart – wrote storage`, normalized); } catch (e) {}
      }
      // done
    } catch (err) {
      // best-effort: ignore errors updating storage
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.warn(`[cart:${instanceId}] addToCart error`, err); } catch (e) {}
      }
    }

    // ⬇️ Resetear después de un tiempo muy corto
    setTimeout(() => {
      isAddingRef.current = false;
    }, 100);
  }

  function removeFromCart(id) {
    // operate on latest storage atomically
    try {
      const current = readStorage();
      const next = current.filter(p => p.id !== id);
      writeStorageAndNotify(next);
      setCart(next);
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.debug(`[cart:${instanceId}] removeFromCart ->`, id, next); } catch (e) {}
      }
    } catch (err) {
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.warn(`[cart:${instanceId}] removeFromCart error`, err); } catch (e) {}
      }
    }
  }

  function increaseQuantity(id) {
    try {
      const current = readStorage();
      const next = current.map(p =>
        p.id === id && (p.quantity || 1) < MAX_ITEMS ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
      writeStorageAndNotify(next);
      setCart(next);
    } catch (err) {
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.warn(`[cart:${instanceId}] increaseQuantity error`, err); } catch (e) {}
      }
    }
  }

  function decreaseQuantity(id) {
    try {
      const current = readStorage();
      const next = current.map(p =>
        p.id === id && (p.quantity || 1) > MIN_ITEMS ? { ...p, quantity: (p.quantity || 1) - 1 } : p
      );
      writeStorageAndNotify(next);
      setCart(next);
    } catch (err) {
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.warn(`[cart:${instanceId}] decreaseQuantity error`, err); } catch (e) {}
      }
    }
  }

  function clearCart() {
    try {
      const next = [];
      writeStorageAndNotify(next);
      setCart(next);
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.debug(`[cart:${instanceId}] clearCart`); } catch (e) {}
      }
    } catch (err) {
      if (typeof window !== 'undefined' && window.__cartDebug) {
        try { console.warn(`[cart:${instanceId}] clearCart error`, err); } catch (e) {}
      }
    }
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