import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Menu from "./Pages/Menu/Menu";
import Login from "./Pages/IniciarSesion/IniciarSesion.jsx"; 
import './App.css';
import Header from '../src/Components/Header';
import Menu2 from "./Pages/Menu2/Menu2.jsx";
function App() {
  return (
    <BrowserRouter>
      <div className='app-content'>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path='/Menu2' element={<Menu2/>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
