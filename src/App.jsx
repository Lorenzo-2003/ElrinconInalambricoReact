<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Menu from "./Pages/Menu/Menu";
import Login from "./Pages/IniciarSesion/IniciarSesion.jsx"; 
import './App.css';
import Menu2 from "./Pages/Menu2/Menu2.jsx";
import Registrar from './Pages/Registrar/Registrar.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className='app-content'>
        <div className='App'>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path='/Menu2' element={<Menu2/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/Registrar" element={<Registrar/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> origin/main
