import React, { Component } from "react";
import "./style.css";

import TextField from "@mui/material/TextField";
import { Button } from "primereact/button";

class SupplierForm extends Component {
  constructor(props) {
    super(props);
    this.state = props.formValue;
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm(event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.submitForm} onReset={() => this.props.onClose()}>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="company_name"
            name="company_name"
            value={this.state.company_name}
            label="Company Name"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="email"
            name="email"
            value={this.state.email}
            label="Email"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="address_line"
            name="address_line"
            value={this.state.address_line}
            label="Address Line"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            required
            id="primary_phone_number"
            name="primary_phone_number"
            value={this.state.primary_phone_number}
            label="Primary Phone Number"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            id="postal_code"
            name="postal_code"
            value={this.state.postal_code}
            label="Postal Code"
            variant="standard"
            onChange={this.handleChange}
          />
        </div>
        <div className="inputContainer">
          <TextField
            className="inputField"
            id="fax"
            name="fax"
            value={this.state.fax}
            label="Fax"
            variant="standard"
            onChange={this.handleChange}
          />
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

export default SupplierForm;
