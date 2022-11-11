import { useEffect, useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import { Button } from "primereact/button";

const SupplierForm = (props) => {
  const [formValue, setFormValue] = useState({});

  useEffect(() => {
    setFormValue(props.formValue);
  }, []);

  const handleChange = (event) => {
    setFormValue({ [event.target.name]: event.target.value });
  };

  const submitForm = (event) => {
    event.preventDefault();
    props.onSubmit(formValue);
  };

  return (
    <form onSubmit={submitForm} onReset={() => props.onClose()}>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="company_name"
          name="company_name"
          value={formValue.company_name}
          label="Company Name"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="email"
          name="email"
          value={formValue.email}
          label="Email"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="address_line"
          name="address_line"
          value={formValue.address_line}
          label="Address Line"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="primary_phone_number"
          name="primary_phone_number"
          value={formValue.primary_phone_number}
          label="Primary Phone Number"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          id="postal_code"
          name="postal_code"
          value={formValue.postal_code}
          label="Postal Code"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          id="fax"
          name="fax"
          value={formValue.fax}
          label="Fax"
          variant="standard"
          onChange={handleChange}
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
};

export default SupplierForm;
