import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/Carrito';
import Header from '../../Components/Header';
import './Cart.css';

export default function CartPage() {
   const { cart, totalItems, cartTotal, increaseQuantity, decreaseQuantity, removeFromCart, clearCart, isEmpty } = useCart();
   const navigate = useNavigate();

  const formatCurrency = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  return (
    <div>
      <Header />
      <main className="container my-5 cart-page">
        <h1 className="mb-4">Mi carrito</h1>

        {isEmpty ? (
          <div className="text-center py-6">
            <p className="lead text-muted">Tu carrito está vacío</p>
            <Link to="/" className="btn btn-primary">Seguir comprando</Link>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-12 col-lg-8">
              <div className="list-group">
                {cart.map(item => (
                  <div key={item.id} className="list-group-item d-flex gap-3 align-items-center">
                    <img src={item.image || '/Img/Carrito3.jpg'} alt={item.name} className="cart-item-img" />
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1">{item.name}</h5>
                          <small className="text-muted">{formatCurrency(item.price || 0)} c/u</small>
                        </div>
                        <div className="text-end">
                          <strong>{formatCurrency((item.price || 0) * (item.quantity || 1))}</strong>
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-2 mt-2">
                        <div className="input-group input-group-sm" style={{ width: 130 }}>
                          <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                          <span className="input-group-text">{item.quantity}</span>
                          <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>

                        <button className="btn btn-sm btn-outline-danger ms-3" onClick={() => removeFromCart(item.id)}>Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="col-12 col-lg-4">
              <div className="card sticky-top" style={{ top: 88 }}>
                <div className="card-body">
                  <h6>Resumen</h6>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="text-muted">Items</small>
                    <strong>{totalItems}</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <small className="text-muted">Subtotal</small>
                    <strong>{formatCurrency(cartTotal)}</strong>
                  </div>

                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" onClick={() => navigate('/payment')}>Ir a pagar</button>
                    <button className="btn btn-outline-secondary" onClick={() => clearCart()}>Vaciar carrito</button>
                    <Link to="/" className="btn btn-link">Seguir comprando</Link>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}
