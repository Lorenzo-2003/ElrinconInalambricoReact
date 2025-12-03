import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/Carrito';
import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Header from '../../Components/Header';
import './Payment.css';

export default function Payment() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    // Tarjeta de crédito
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // PayPal
    paypalEmail: '',
    // Datos adicionales
    phone: '',
    address: ''
  });

  console.log('🛒 Payment component loaded');
  console.log('👤 User:', user);
  console.log('🛍️ Cart:', cart);
  console.log('💰 Cart Total:', cartTotal);

  // Obtener métodos de pago al cargar
  useEffect(() => {
    console.log('💳 Fetching payment methods...');
    const fetchPaymentMethods = async () => {
      try {
        const methods = await apiService.pago.getFpagos();
        console.log('✅ Payment methods loaded:', methods);
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedPaymentMethod(methods[0].id.toString());
        }
      } catch (err) {
        console.error('❌ Error loading payment methods:', err);
        setError('Error al cargar métodos de pago');
      }
    };
    fetchPaymentMethods();
  }, []);

  // Verificar autenticación - SOLO redirigir si no hay user
  useEffect(() => {
    console.log('🔍 Checking auth...');
    if (!user) {
      console.log('⚠️ No user, redirecting to login');
      navigate('/login');
    }
  }, [user, navigate]);

  // Verificar carrito - SOLO redirigir si está vacío
  useEffect(() => {
    console.log('🔍 Checking cart...');
    if (cart.length === 0) {
      console.log('⚠️ Empty cart, redirecting to cart');
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    
    let formattedValue = value;

    if (name === 'cardNumber') {
      // Formatear número de tarjeta: 1234 5678 9012 3456
      const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const match = cleaned.match(/\d{1,4}/g);
      formattedValue = match ? match.join(' ').substr(0, 19) : '';
    } else if (name === 'expiryDate') {
      // Formatear fecha: MM/YY
      const cleaned = value.replace(/\D+/g, '');
      if (cleaned.length >= 2) {
        formattedValue = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
      } else {
        formattedValue = cleaned;
      }
    } else if (name === 'cvv') {
      // Solo números para CVV
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 3);
    } else if (name === 'cardName') {
      // Solo letras y espacios para nombre
      formattedValue = value.replace(/[^a-zA-Z\s]/g, '').toUpperCase();
    }

    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateForm = () => {
    const selectedMethod = paymentMethods.find(m => m.id.toString() === selectedPaymentMethod);

    if (selectedMethod && (selectedMethod.nombreFpago.toLowerCase().includes('tarjeta') ||
                           selectedMethod.nombreFpago.toLowerCase().includes('crédito') ||
                           selectedMethod.nombreFpago.toLowerCase().includes('debito'))) {
      // Validar campos de tarjeta
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        setError('Completa todos los campos de la tarjeta');
        return false;
      }
      if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        setError('Número de tarjeta inválido');
        return false;
      }
      if (formData.cvv.length < 3) {
        setError('CVV inválido');
        return false;
      }
    } else if (selectedMethod && selectedMethod.nombreFpago.toLowerCase().includes('paypal')) {
      // Validar PayPal
      if (!formData.paypalEmail) {
        setError('Ingresa tu email de PayPal');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.paypalEmail)) {
        setError('Email de PayPal inválido');
        return false;
      }
    }

    return true;
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      setError('Selecciona un método de pago');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('� Starting payment process...');

      // Paso 1: Sincronizar carrito con BD
      console.log('🔄 Syncing cart to database...');
      const syncedCartId = await apiService.pago.syncCartToDatabase(cart, user.id);

      if (!syncedCartId) {
        throw new Error('Error al sincronizar el carrito con la base de datos');
      }

      console.log('✅ Cart synced successfully, cartId:', syncedCartId);

      // Paso 2: Crear factura con el cartId real
      const fechaActual = new Date().toISOString().split('T')[0];

      const facturaData = {
        usuarioId: parseInt(user.id),
        carroId: parseInt(syncedCartId),
        formaPago: { id: parseInt(selectedPaymentMethod) },
        fecha: fechaActual,
        monto: cartTotal || 0
      };

      console.log('📡 Sending factura data to backend:', JSON.stringify(facturaData, null, 2));
      console.log('� Creating invoice with real cart data...');
      const result = await apiService.pago.createFactura(facturaData);
      console.log('✅ Payment completed successfully:', result);

      // Limpiar carrito local
      clearCart();

      // Redirigir a página de éxito
      navigate('/success');

    } catch (err) {
      console.error('❌ Payment failed:', err);
      setError(err.message || 'Error al procesar el pago');
    } finally {
      setLoading(false);
    }
  };

  // Loading state mientras verifica autenticación
  if (!user) {
    return (
      <div>
        <Header />
        <div className="payment-loading">
          <div className="loading-spinner"></div>
          <p>Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Loading state mientras verifica carrito
  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="payment-loading">
          <div className="loading-spinner"></div>
          <p>Verificando carrito...</p>
        </div>
      </div>
    );
  }

  const formatCurrency = (n) => (n || 0).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
  const selectedMethod = paymentMethods.find(m => m.id.toString() === selectedPaymentMethod);

  return (
    <div>
      <Header />
      <div className="payment-container">
        <div className="payment-wrapper">
          <div className="payment-main">
            <div className="payment-header">
              <h1><i className="fas fa-credit-card"></i> Confirmar Pago</h1>
              <p>Completa tus datos para procesar el pedido</p>
            </div>

            {error && (
              <div className="alert alert-danger alert-dismissible fade show">
                <i className="fas fa-exclamation-triangle"></i>
                <strong>Error:</strong> {error}
                <button type="button" className="btn-close" onClick={() => setError('')}></button>
              </div>
            )}

            <div className="payment-content">
              {/* Resumen del pedido */}
              <div className="order-summary-card">
                <div className="card-header-custom">
                  <h3><i className="fas fa-shopping-bag"></i> Resumen del Pedido</h3>
                </div>
                <div className="card-body-custom">
                  <div className="order-items">
                    {cart.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-info">
                          <img src={item.image || '/Img/Carrito3.jpg'} alt={item.name} className="item-thumb" />
                          <div className="item-details">
                            <h5>{item.name}</h5>
                            <p className="item-price">{formatCurrency(item.price)} × {item.quantity || 1}</p>
                          </div>
                        </div>
                        <div className="item-total">
                          <strong>{formatCurrency((item.price || 0) * (item.quantity || 1))}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-total">
                    <div className="total-row">
                      <span>Total a pagar:</span>
                      <span className="total-amount">{formatCurrency(cartTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Método de pago */}
              <div className="payment-method-card">
                <div className="card-header-custom">
                  <h3><i className="fas fa-money-check-alt"></i> Método de Pago</h3>
                </div>
                <div className="card-body-custom">
                  <div className="payment-method-selector">
                    <label className="form-label">Selecciona método de pago:</label>
                    <select
                      value={selectedPaymentMethod}
                      onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                      className="form-select form-select-lg"
                      disabled={paymentMethods.length === 0}
                    >
                      <option value="">
                        {paymentMethods.length === 0 ? 'Cargando métodos...' : 'Seleccionar método'}
                      </option>
                      {paymentMethods.map(method => (
                        <option key={method.id} value={method.id}>
                          {method.nombreFpago}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Formulario de tarjeta */}
                  {selectedMethod && (selectedMethod.nombreFpago.toLowerCase().includes('tarjeta') ||
                                     selectedMethod.nombreFpago.toLowerCase().includes('crédito') ||
                                     selectedMethod.nombreFpago.toLowerCase().includes('debito')) && (
                    <div className="payment-form">
                      <h4><i className="fas fa-credit-card"></i> Datos de la Tarjeta</h4>
                      <div className="form-grid">
                        <div className="form-group">
                          <label className="form-label">Número de Tarjeta *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            className="form-control"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            maxLength="19"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nombre en la Tarjeta *</label>
                          <input
                            type="text"
                            name="cardName"
                            className="form-control"
                            placeholder="JUAN PÉREZ"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Fecha de Expiración *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            className="form-control"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            maxLength="5"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">CVV *</label>
                          <input
                            type="password"
                            name="cvv"
                            className="form-control"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength="3"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Formulario de PayPal */}
                  {selectedMethod && selectedMethod.nombreFpago.toLowerCase().includes('paypal') && (
                    <div className="payment-form">
                      <h4><i className="fab fa-paypal"></i> PayPal</h4>
                      <div className="form-group">
                        <label className="form-label">Email de PayPal *</label>
                        <input
                          type="email"
                          name="paypalEmail"
                          className="form-control"
                          placeholder="tu@email.com"
                          value={formData.paypalEmail}
                          onChange={handleInputChange}
                          required
                        />
                        <small className="form-text text-muted">
                          Serás redirigido a PayPal para completar el pago
                        </small>
                      </div>
                    </div>
                  )}

                  {/* Información adicional */}
                  <div className="additional-info">
                    <h4><i className="fas fa-user"></i> Información Adicional</h4>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Teléfono</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="+569 1234 5678"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Dirección</label>
                        <textarea
                          name="address"
                          className="form-control"
                          placeholder="Dirección de envío"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows="2"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de pago */}
            <div className="payment-actions">
              <button
                className="btn btn-secondary me-3"
                onClick={() => navigate('/cart')}
                disabled={loading}
              >
                <i className="fas fa-arrow-left"></i> Volver al Carrito
              </button>
              <button
                onClick={handlePayment}
                disabled={loading || !selectedPaymentMethod}
                className="btn-payment-primary"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Procesando Pago...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i> Pagar {formatCurrency(cartTotal)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}