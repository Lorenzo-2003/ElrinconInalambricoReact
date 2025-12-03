// API service for microservice communication
const API_BASE_URL = 'http://localhost:8082';

export const apiService = {
  // Catalogo microservice
  catalogo: {
    getProductos: async () => {
      const response = await fetch(`${API_BASE_URL}/producto`);
      if (!response.ok) throw new Error('Error fetching products');
      return response.json();
    }
  },

  // Carro microservice
  carro: {
    addToCart: async (carroData) => {
      const response = await fetch(`${API_BASE_URL}/carro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carroData)
      });
      if (!response.ok) throw new Error('Error adding to cart');
      return response.json();
    },

    getCarros: async () => {
      const response = await fetch(`${API_BASE_URL}/carro`);
      if (!response.ok) throw new Error('Error fetching cart');
      return response.json();
    },

    getCarrosDetalles: async () => {
      const response = await fetch(`${API_BASE_URL}/carro/detalles`);
      if (!response.ok) throw new Error('Error fetching cart details');
      return response.json();
    },

    removeFromCart: async (id) => {
      const response = await fetch(`${API_BASE_URL}/carro/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Error removing from cart');
    }
  },

  // Usuario microservice
  usuario: {
    getUsuario: async (id) => {
      const response = await fetch(`http://localhost:8081/usuario/${id}`);
      if (!response.ok) throw new Error('Error fetching user');
      return response.json();
    }
  },

  // Pago microservice
  pago: {
    createFactura: async (facturaData) => {
      const response = await fetch(`http://localhost:8083/factura`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturaData)
      });
      if (!response.ok) throw new Error('Error creating invoice');
      return response.json();
    },

    getFpagos: async () => {
      const response = await fetch(`http://localhost:8083/fpago`);
      if (!response.ok) throw new Error('Error fetching payment methods');
      return response.json();
    }
  }
};