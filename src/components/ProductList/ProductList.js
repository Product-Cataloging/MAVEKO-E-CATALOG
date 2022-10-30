import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

export default function ProductList(props) {
  const productList = [];
  props.products.forEach((product) => {
    productList.push(
      <ProductCard
        title={product.title}
        detail={product.detail}
        image={product.image}
        show={product.show}
      ></ProductCard>
    );
  });

  return <div className="productList">{productList}</div>;
}
