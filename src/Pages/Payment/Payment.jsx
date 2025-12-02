import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/Carrito';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Payment.css';

export default function Payment() {
   const { cart, getTotal, removeFromCart } = useCart();
   const { user: authUser } = useAuth();
   const [paymentMethod, setPaymentMethod] = useState('card');
   const [loading, setLoading] = useState(false);
   const [invoice, setInvoice] = useState(null);
   const [userDetails, setUserDetails] = useState(null);
   const [paymentData, setPaymentData] = useState({
     cardNumber: '',
     cardName: '',
     expiryDate: '',
     cvv: '',
     paypalEmail: ''
   });
   const navigate = useNavigate();

  useEffect(() => {
     // Redirect if cart is empty
     if (cart.length === 0) {
       navigate('/');
       return;
     }

     // Redirect if not logged in
     if (!authUser || !authUser.id) {
       navigate('/iniciar-sesion');
       return;
     }

     // Load user data
     const loadUserData = async () => {
       try {
         const userData = await apiService.usuario.getUsuario(authUser.id);
         setUserDetails(userData);
       } catch (error) {
         console.error('Error loading user data:', error);
       }
     };

     loadUserData();
   }, [cart, authUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create invoice via pago microservice
      const invoiceData = {
        usuarioId: authUser.id,
        carroId: 1, // This should be the actual cart ID from carro microservice
        formaPago: { id: paymentMethod === 'card' ? 1 : 2 }, // 1=Card, 2=PayPal
        monto: getTotal(),
        fecha: new Date().toISOString().split('T')[0]
      };

      const createdInvoice = await apiService.pago.createFactura(invoiceData);
      setInvoice(createdInvoice);

      // Clear cart after successful payment
      cart.forEach(item => removeFromCart(item.id));

    } catch (error) {
      console.error('Payment error:', error);
      alert('Error processing payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (invoice) {
    return (
      <div className="container my-5 payment-page">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">¡Pago Exitoso!</h4>
          <p>Tu pago ha sido procesado correctamente.</p>
        </div>

        <div className="card">
          <div className="card-header bg-success text-white">
            <h3 className="card-title mb-0">Factura #{invoice.id}</h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <h5>Información del Cliente</h5>
                <p><strong>Nombre:</strong> {userDetails?.nombre}</p>
                <p><strong>RUT:</strong> {userDetails?.rut}</p>
                <p><strong>Email:</strong> {userDetails?.correo}</p>
                <p><strong>Teléfono:</strong> {userDetails?.telefono || 'No disponible'}</p>
              </div>
              <div className="col-md-6">
                <h5>Detalles de la Factura</h5>
                <p><strong>Fecha:</strong> {invoice.fecha}</p>
                <p><strong>Método de Pago:</strong> {invoice.formaPago.nombreFpago}</p>
                <p><strong>Total:</strong> ${invoice.monto.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-4">
              <h5>Productos Comprados</h5>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>${item.price.toLocaleString()}</td>
                      <td>${(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 text-center">
              <button className="btn btn-primary" onClick={() => navigate('/')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5 payment-page">
      <h1 className="text-center mb-4">Procesar Pago</h1>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">Información de Pago</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handlePayment}>
                <div className="mb-3">
                  <label className="form-label">Método de Pago</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="card">
                      Tarjeta de Crédito/Débito
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' ? (
                  <>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardNumber" className="form-label">Número de Tarjeta</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cardName" className="form-label">Nombre en la Tarjeta</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cardName"
                          name="cardName"
                          placeholder="Juan Pérez"
                          value={paymentData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="expiryDate" className="form-label">Fecha de Expiración</label>
                        <input
                          type="text"
                          className="form-control"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cvv" className="form-label">CVV</label>
                        <input
                          type="text"
                          className="form-control"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    <label htmlFor="paypalEmail" className="form-label">Email de PayPal</label>
                    <input
                      type="email"
                      className="form-control"
                      id="paypalEmail"
                      name="paypalEmail"
                      placeholder="tu@email.com"
                      value={paymentData.paypalEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-100"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Procesando...
                    </>
                  ) : (
                    `Pagar $${getTotal().toLocaleString()}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Resumen del Pedido</h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>${getTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}