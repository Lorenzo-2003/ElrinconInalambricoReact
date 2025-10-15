import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Menu from "./Pages/Menu/Menu";
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );
}


export default App;
