import logo from './logo.svg';
import './App.css';
import { Route, Routes } from "react-router-dom";
import ProductsLayout from './layouts/ProductsLayout/ProductsLayout'

function App() {
  return (
    <div className="App">
      <h1>MAVEKO</h1>
      <Routes>
        <Route path="/category/:id" element={<ProductsLayout/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
