// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';  // ← Header importado aquí
import Menu from './Pages/Menu/Menu';
import IniciarSesion from './Pages/IniciarSesion/IniciarSesion';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />  {/* ← Header se muestra aquí, en TODAS las páginas */}
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/login" element={<IniciarSesion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
