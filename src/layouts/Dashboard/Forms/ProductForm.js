import React, { Component } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import { Button } from "primereact/button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { categories_path } from "../../../environment";
import { get } from "../../../services/AdminServices";

import { Dropdown } from 'primereact/dropdown';
 

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = { formValue: { ...props.formValue }, categories: [] };
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    get(categories_path).then((response) => {
      let data = response.data;
      let categories = [];
      for (const key in data) {
        if (data[key].children.length > 0) {
          data[key].children.forEach((category) => {
            categories.push(category);
          });
        }
      }
      this.setState({ categories: categories });
    });
  }

  handleChange(event) {
    console.log(event)
    this.setState((state) => ({
      formValue: {
        ...state.formValue,
        [event.target.name]: event.target.value,
      },
    }));
  }

  submitForm(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.formValue);
  }

  render() {
    return (
      <form onSubmit={this.submitForm} onReset={() => this.props.onClose()}>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="name"
            name="name"
            value={this.state.formValue.name}
            label="Product Name"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            id="brand"
            name="brand"
            value={this.state.formValue.brand}
            label="Brand"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="image_url"
            name="image_url"
            value={this.state.formValue.image_url}
            label="Image Url"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            id="description"
            name="description"
            multiline
            rows={3}
            value={this.state.formValue.description}
            label="Description"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <FormControl required variant="standard" className="inputField">
            <InputLabel id="categoryLabel">Age</InputLabel>
            <Select
              labelId="categoryLabel"
              id="category_id"
              name="category_id"
              value={this.state.formValue.category_id}
              label="Product Category"
              onChange={this.handleChange}
            >
              {this.state.categories.map((category) => (
                <MenuItem value={category.id}>{category.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* <select value="1">
            <option value = "1">One</option>
            <option value = "2">Two</option>
            <option value = "3">Three</option>
            <option value = "4">Four</option>
          </select> */}
        </div>

        <div className="buttonsContainer">
          <Button
            label="Cancel"
            icon="pi pi-times"
            size="small"
            type="reset"
            className="p-button-danger p-button-raised p-button-sm"
          />
          &nbsp;
          <Button
            label="Save"
            icon="pi pi-check"
            type="submit"
            className="p-button-primary p-button-raised p-button-sm"
          />
        </div>
      </form>
    );
  }
}

export default ProductForm;
