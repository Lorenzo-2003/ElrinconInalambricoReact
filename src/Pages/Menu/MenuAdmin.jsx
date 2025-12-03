import React from "react";
import { Link } from "react-router-dom";
import CarouselMenu from "./CarouselMenu";
import "./Menu.css";
import useCart from "../../hooks/Carrito";
import Header from "../../Components/Header.jsx";

export default function MenuAdmin() {
  const { addToCart } = useCart();

  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    return Number(String(price).replace(/[^0-9]/g, "")) || 0;
  };

  return (
    <div>
      <Header/>
      
      {/* 🔥 BANNER DE ADMINISTRADOR */}
      <div className="admin-banner bg-dark text-white py-3 mb-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">⚡ Panel de Administración</h4>
            <div className="admin-actions">
              <Link to="/admin/usuarios" className="btn btn-outline-light btn-sm me-2">
                👥 Gestionar Usuarios
              </Link>
              <Link to="/admin/productos" className="btn btn-outline-light btn-sm me-2">
                📦 Gestionar Productos
              </Link>
              <Link to="/admin/ventas" className="btn btn-outline-light btn-sm">
                📊 Ver Ventas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel */}
      <CarouselMenu />

      {/* Cards de productos - MISMA ESTRUCTURA pero con botones de admin */}
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col">
            <div className="card h-100 text-center">
              <img src="/Img/cartasPkm.jpg" alt="CartasPkm" />
              <div className="card-header bg-primary text-white">
                Cartas Brecha Paradojica
                <span className="badge bg-warning float-end">Admin</span>
              </div>
              <div className="card-body">
                <h2 className="card-title">$12.000</h2>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">1 Paquete</li>
                  <li className="list-group-item">Envío dentro de las 24 horas</li>
                  <li className="list-group-item">Stock: 50 unidades</li>
                </ul>
                
                {/* 🔥 BOTONES ESPECIALES PARA ADMIN */}
                <div className="btn-group w-100" role="group">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart({
                        id: "t-1",
                        name: "Cartas Brecha Paradojica",
                        image: "/Img/cartasPkm.jpg",
                        price: parsePrice("$12.000")
                      });
                    }}
                  >
                    Agregar al Carrito
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      // Función para eliminar producto
                      console.log("Eliminar producto");
                    }}
                  >
                    🗑️ Eliminar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => {
                      // Función para editar producto
                      console.log("Editar producto");
                    }}
                  >
                    ✏️ Editar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Repite la misma estructura para los otros productos... */}
          
        </div>
      </div>

      {/* 🔥 SECCIÓN EXCLUSIVA PARA ADMIN - GESTIÓN DE INVENTARIO */}
      <div className="container my-5">
        <div className="card border-primary">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0">📊 Panel de Control del Administrador</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5 className="card-title">👥 Usuarios</h5>
                    <p className="card-text">50 registrados</p>
                    <Link to="/admin/usuarios" className="btn btn-primary">
                      Gestionar
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5 className="card-title">📦 Productos</h5>
                    <p className="card-text">25 en inventario</p>
                    <Link to="/admin/productos" className="btn btn-success">
                      Gestionar
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5 className="card-title">💰 Ventas</h5>
                    <p className="card-text">$1,250,000 total</p>
                    <Link to="/admin/ventas" className="btn btn-warning">
                      Ver Reportes
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3 mb-3">
                <div className="card text-center h-100">
                  <div className="card-body">
                    <h5 className="card-title">⚙️ Configuración</h5>
                    <p className="card-text">Ajustes del sistema</p>
                    <Link to="/admin/config" className="btn btn-secondary">
                      Configurar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 CSS adicional para admin */}
      <style jsx>{`
        .admin-banner {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .admin-actions .btn {
          transition: all 0.3s;
        }
        .admin-actions .btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}