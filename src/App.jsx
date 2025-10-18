import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Menu from "./Pages/Menu/Menu";
import Manga from "./Pages/PaginasNavbar/Manga";
import Figuras from "./Pages/PaginasNavbar/Figuras";
import Consolas from "./Pages/PaginasNavbar/Consolas";
import Cartas from "./Pages/PaginasNavbar/Cartas";
import Login from "./Pages/IniciarSesion/IniciarSesion";
import Registrar from "./Pages/Registrar/Registrar.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App"> {/* wrapper para aplicar fondo */}
        <Header />
        <main className="app-content container-lg">
          <Routes>
            <Route path="/" element={<Menu />} />
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