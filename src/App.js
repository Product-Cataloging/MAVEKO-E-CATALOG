import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import ProductsLayout from "./layouts/ProductsLayout/ProductsLayout";
import Home from "./layouts/home/Home";

function App() {
  return (
    <div className="home">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/category/:id" element={<ProductsLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
