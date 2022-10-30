import React from "react";
import "./ProductsLayout.css";
import ProductList from "../../components/ProductList/ProductList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";

export default function ProductsLayout() {
  const filters = [];
  const products = [];
  return (
    <div className="productsLayout">
      <div className="leftView">
        <FilterMenu filters={filters}></FilterMenu>
      </div>
      <div className="rightView">
        <div className="rightViewTitle">
          <h1>Category Name</h1>
          <p> {products.length} Products</p>
        </div>
        <div className="rightViewData">
          <ProductList products={products}></ProductList>
        </div>
      </div>
    </div>
  );
}
