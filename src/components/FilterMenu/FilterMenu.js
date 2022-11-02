import React from "react";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import "./FilterMenu.css";

export default function FilterMenu({ setProduct }) {
  const materials = [];
  const suppliers = [];
  const colors = [];

  const filter = (key) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        payload: {
          keyword: key,
        },
      }),
    };

    fetch("https://product-catalog-api.onrender.com/search/", requestOptions)
      .then((response) => response.json())
      .then((response) => setProduct(response.data));
  };

  const [items, setItems] = useState([]);
  const fetchData = () => {
    fetch("https://product-catalog-api.onrender.com/product_items/")
      .then((res) => res.json())
      .then((res) => setItems(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    filter(event.target.value);
  };

  const temp = [];
  items.forEach((filter) => {
    if (!temp.includes(filter.supplier_company_name)) {
      suppliers.push(
        <FormControlLabel
          value={filter.supplier_company_name}
          control={<Radio />}
          onChange={handleChange}
          label={filter.supplier_company_name}
        />
      );
      temp.push(filter.supplier_company_name);
    }

    if (!temp.includes(filter.color)) {
      colors.push(
        <FormControlLabel
          value={filter.color}
          control={<Radio />}
          onChange={handleChange}
          label={filter.color}
        />
      );
      temp.push(filter.color);
    }

    if (!temp.includes(filter.material)) {
      materials.push(
        <FormControlLabel
          value={filter.material}
          control={<Radio />}
          onChange={handleChange}
          label={filter.material}
        />
      );
      temp.push(filter.material);
    }

    
  });

  return (
    <div className="sidebarFilterMenu">
      {/* <div className="filterMenu">
        <div className="filterTitle">
          <h3>Supplier</h3>
        </div>

        <div className="filterValues">
          <RadioGroup>{suppliers}</RadioGroup>
        </div>
      </div> */}

      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Color</h3>
        </div>

        <div className="filterValues">
          <RadioGroup>{colors}</RadioGroup>
        </div>
      </div>

      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Material</h3>
        </div>

        <div className="filterValues">
          <RadioGroup>{materials}</RadioGroup>
        </div>
      </div>
    </div>
  );
}
