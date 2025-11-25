import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Menu from "./Pages/Menu/Menu";
import Manga from "./Pages/PaginasNavbar/Manga";
import Figuras from "./Pages/PaginasNavbar/Figuras";
import Consolas from "./Pages/PaginasNavbar/Consolas";
import Cartas from "./Pages/PaginasNavbar/Cartas";
import Login from "./Pages/IniciarSesion/IniciarSesion.jsx";
import Registrar from "./Pages/Registrar/Registrar.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main className="app-content">
          <Routes>
            <Route path="/" element={<Menu />} />
            {/* Removed separate /menu2 route — Menu ahora muestra cambios de Header según estado de sesión */}
            <Route path="/mangas" element={<Manga />} />
            <Route path="/figuras" element={<Figuras />} />
            <Route path="/consolas" element={<Consolas />} />
            <Route path="/cartas" element={<Cartas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}