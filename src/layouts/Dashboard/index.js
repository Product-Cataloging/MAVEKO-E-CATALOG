import React, { Component } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Supplier from "./Pages/Supplier";
import Product from "./Pages/Product";
import ProductItem from "./Pages/ProductItem";
import Quotation from "./Pages/Quotation";
import User from "./Pages/User";

class Admin extends Component {
  state = {};
  render() {
    return (
      <div style={{ display: "flex", backgroundColor: 'var(--gray)' }}>
        <DashboardNavbar />
        <div style={{ padding: "15px", flexGrow: 1}}>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />}></Route>
            <Route exact path="/suppliers" element={<Supplier />}></Route>
            <Route exact path="/products" element={<Product />}></Route>
            <Route exact path="/products/:id" element={<ProductItem />}></Route>
            <Route exact path="/quotations" element={<Quotation />}></Route>
            <Route exact path="/users" element={<User />}></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default Admin;
