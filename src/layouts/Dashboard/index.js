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
      <div style={{ display: "flex" }}>
        <DashboardNavbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/supplers" element={<Supplier />}></Route>
          <Route exact path="/products" element={<Product />}></Route>
          <Route exact path="/products/:id" element={<ProductItem />}></Route>
          <Route exact path="/quotations" element={<Quotation />}></Route>
          <Route exact path="/users" element={<User />}></Route>
        </Routes>
      </div>
    );
  }
}

export default Admin;
