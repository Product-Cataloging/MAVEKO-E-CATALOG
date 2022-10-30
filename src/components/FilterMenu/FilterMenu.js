import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "./FilterMenu.css";

export default function FilterMenu(props) {
  const suppliers = [];
  const materials = [];
  const colors = [];
  const prices = [];

  props.filters.forEach((filter) => {
    suppliers.push(
      <FormControlLabel control={<Checkbox />} label={filter.supplier} />
    );
    materials.push(
      <FormControlLabel control={<Checkbox />} label={filter.material} />
    );
    colors.push(
      <FormControlLabel control={<Checkbox />} label={filter.color} />
    );
    prices.push(
      <FormControlLabel control={<Checkbox />} label={filter.price} />
    );
  });

  return (
    <div className="sidebarFilterMenu">
      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Supplier</h3>
        </div>

        <div className="filterValues">
          <FormGroup>{suppliers}</FormGroup>
        </div>
      </div>

      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Color</h3>
        </div>

        <div className="filterValues">
          <FormGroup>{colors}</FormGroup>
        </div>
      </div>

      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Material</h3>
        </div>

        <div className="filterValues">
          <FormGroup>{materials}</FormGroup>
        </div>
      </div>

      <div className="filterMenu">
        <div className="filterTitle">
          <h3>Price</h3>
        </div>

        <div className="filterValues">
          <FormGroup>{prices}</FormGroup>
        </div>
      </div>
    </div>
  );
}
