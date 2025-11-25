
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom';
import { Link } from "react-router-dom";
import useCart from "../hooks/Carrito"; 

export default function PeCarro() {
  console.log("PeCarro: render / useCart hook will be used");
  const {
    cart,
    totalItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    isEmpty,
    clearCart
  } = useCart();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      // close if click is outside button / wrapper and also outside portal dropdown
      const clickedInsideWrapper = ref.current && ref.current.contains(e.target);
      const clickedOnBtn = btnRef.current && btnRef.current.contains(e.target);
      const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
      if (!clickedInsideWrapper && !clickedOnBtn && !clickedInsideDropdown) setOpen(false);
    }
    document.addEventListener("click", handleOutside);
    return () => document.removeEventListener("click", handleOutside);
  }, []);

  const formatCurrency = (n) =>
    n.toLocaleString("es-CL", { style: "currency", currency: "CLP", maximumFractionDigits: 0 });

  const getImgSrc = (img) => {
    if (!img) return "/Img/Carrito3.jpg";
    if (img.startsWith("/")) return img; // si ya es ruta absoluta como '/Img/archivo.jpg'
    if (/\.(jpg|jpeg|png|webp|svg)$/i.test(img)) return `/img/${img}`;
    return `/img/${img}.webp`;
  };

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={btnRef}
        type="button"
        className="btn btn-link position-relative"
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        aria-expanded={open}
        aria-label="Abrir carrito"
        style={{ color: "inherit", textDecoration: "none" }}
      >
        <img src="/Img/Carrito3.jpg" alt="Carrito" className="cart-icon" style={{ width: 44, height: 44 }} />
          {totalItems > 0 && (
          <span className="badge bg-danger rounded-pill cart-badge" style={{ position: "absolute", top: -6, right: -6 }}>
            {totalItems}
          </span>
        )}
      </button>

      {open && (() => {
        // render dropdown in a portal so it's not clipped by stacking contexts
        const dropdown = (
          <div
            className="card shadow-sm cart-dropdown"
            ref={dropdownRef}
            style={{ position: window.innerWidth >= 992 ? 'fixed' : 'absolute', right: window.innerWidth >= 992 ? 18 : 0, top: window.innerWidth >= 992 ? 'calc(72px + 8px)' : 40, maxHeight: 420, overflow: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-body p-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="card-title mb-0">Carrito</h6>
                {!isEmpty && <small className="text-muted">{totalItems} items</small>}
              </div>

              {isEmpty ? (
                <p className="text-center text-muted mb-3">Tu carrito está vacío</p>
              ) : (
                <>
                  <ul className="list-unstyled mb-2">
                    {cart.map(item => (
                      <li key={item.id} className="d-flex align-items-center gap-2 py-2 border-bottom">
                        <img src={getImgSrc(item.image)} alt={item.name} style={{ width: 56, height: 56, objectFit: "contain" }} />
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <strong style={{ fontSize: 14 }}>{item.name}</strong>
                            <small className="text-muted">{formatCurrency((item.price || 0) * (item.quantity || 1))}</small>
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(item.id)}>-</button>
                            <span className="px-2">{item.quantity}</span>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(item.id)}>+</button>
                            <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <small className="text-muted">Total</small>
                      <div className="fw-bold">{formatCurrency(cartTotal)}</div>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <Link to="/cart" className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Ver carrito</Link>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => { clearCart(); setOpen(false); }}>Vaciar</button>
                  </div>
                </>
              )}
            </div>
          </div>
        );

        return window && window.document ? createPortal(dropdown, document.body) : dropdown;
      })()}
    </div>
  );
}