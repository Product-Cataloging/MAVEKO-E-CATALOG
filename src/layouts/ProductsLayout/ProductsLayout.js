import React from "react";
import "./ProductsLayout.css";
import { useState, useEffect } from "react";
import ProductList from "../../components/ProductList/ProductList";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import { useParams } from "react-router-dom";

export default function ProductsLayout(props) {
  const params = useParams();
  const filters = [];
  const items = [];

  const [products, setProduct] = useState([]);
  const fetchData = () => {
    fetch(
      "https://product-catalog-api.onrender.com/category/products/" + params.id
    )
      .then((res) => res.json())
      .then((res) => setProduct(res.data));
  };

  const setValue = (data) => {
    setProduct(data);
  };

  products.forEach((product) => {
    console.log(product)
    if (product.category_id === parseInt(params.id)) {
      items.push({
        title: product.name,
        detail: product.description,
        image: product.image_url,
        show: "show",
      });
    }
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="productsLayout">
      <div className="leftView">
        <FilterMenu setProduct={setValue} filters={filters}></FilterMenu>
      </div>
      <div className="rightView">
        <div className="rightViewTitle">
          <h1>Category</h1>
          <p> {products.length} Products</p>
        </div>
        <div className="rightViewData">
          <ProductList products={items}></ProductList>
        </div>
      </div>
    </div>
  );
}
