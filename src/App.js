import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsLayout from './layouts/ProductsLayout/ProductsLayout'
import Home from './layouts/home/Home';
import { Route, Routes } from "react-router-dom";
import ProductsLayout from './layouts/ProductsLayout/ProductsLayout'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home"/>}/>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/category/:id" element={<ProductsLayout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
