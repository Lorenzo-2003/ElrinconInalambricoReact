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
    syncCartToDatabase: async (cart, userId) => {
      console.log('🛒 API: Syncing cart to database, cart:', cart, 'userId:', userId);

      if (!cart || cart.length === 0) {
        throw new Error('Cart is empty, nothing to sync');
      }

      // Convertir items del carrito a formato compatible con BD
      const carroItems = cart.map(item => ({
        producto: { id: item.id },  // Solo el ID del producto
        cantidad: item.quantity || 1,
        usuarioId: userId
      }));

      console.log('📡 API: Sending cart items to database:', carroItems);

      const response = await fetch(`${API_BASE_URL}/carro/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carroItems)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('📡 API: Error syncing cart:', errorText);
        throw new Error(`Error syncing cart: ${response.status} - ${errorText}`);
      }

      const savedCarros = await response.json();
      console.log('✅ Cart synced successfully:', savedCarros);

      // Retornar el ID del primer carro (todos deberían tener el mismo usuarioId)
      return savedCarros.length > 0 ? savedCarros[0].id : null;
    },

    createFactura: async (facturaData) => {
      console.log('📡 API: Sending factura data:', facturaData);
      const response = await fetch(`http://localhost:8083/factura`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturaData)
      });
      console.log('📡 API: Response status:', response.status);
      console.log('📡 API: Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('📡 API: Error response:', errorText);
        throw new Error(`Error creating invoice: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      console.log('📡 API: Success response:', result);
      return result;
    },

    getFpagos: async () => {
      console.log('📡 API: Fetching payment methods');
      const response = await fetch(`http://localhost:8083/fpago`);
      if (!response.ok) {
        const errorText = await response.text();
        console.log('📡 API: Fpago error:', errorText);
        throw new Error(`Error fetching payment methods: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      console.log('📡 API: Fpago success:', result);
      return result;
    }
  }
};