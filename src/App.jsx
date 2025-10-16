import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Menu from "./Pages/Menu/Menu";

function App() {
  return (
    <BrowserRouter>
      <Menu />
    </BrowserRouter>
  );
}

export default App;
