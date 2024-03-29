import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Categorias from "./pages/Categorias";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Introduction from "./pages/Introduction";
import Marcas from "./pages/Marcas";
import Ventas from "./pages/Ventas";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Introduction />} />
          <Route exact path="/productos" element={<Products />} />
          <Route exact path="/categorias" element={<Categorias />} />
          <Route exact path="/usuarios" element={<Usuarios />} />
          <Route exact path="/marcas" element={<Marcas/>}/>
          <Route exact path="/ventas" element={<Ventas/>}/>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
