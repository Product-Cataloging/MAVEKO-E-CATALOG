import logo from './logo.svg';
import './App.css';
import Home from './layouts/home/Home';
import { Route, Routes } from "react-router-dom";
import ProductsLayout from './layouts/ProductsLayout/ProductsLayout'

function App() {
  return (
    <div className="App">
      <Home/>
      <Routes>
        <Route path="/category/:id" element={<ProductsLayout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
