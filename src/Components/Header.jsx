// Header.jsx
import React from 'react';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <a href="/" className="logo-link">
            <img 
              src="/Img/Elrincon.png" 
              alt="Logo El Rincón Inalámbrico" 
              className="logo"
            />
          </a>
        </div>
        
        <div className="title-section">
          <h1 className="header-title">Rincon Inalambrico</h1>
        </div>
        
        <div className="actions-section">
          {/* Espacio para botones futuros */}
        </div>
      </div>
    </header>
  );
}