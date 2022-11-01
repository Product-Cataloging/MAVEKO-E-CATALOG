import React, { Component, useEffect, useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import { Button } from "primereact/button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Checkbox, FormControlLabel } from "@mui/material";

const UserForm = (props) => {
  const [formValue, setFormValue] = useState({user_type: 'Operator'});
  const [userTypes, setUserTypes] = useState(["Operator", "Admin"]);
  const [password, setPassword] = useState({
    password: "",
    confirm_password: "",
  });

  useEffect(() => {
    setFormValue(props.formValue);
  }, []);

  const handleChange = (event) => {
    if (
      event.target.name === "password" ||
      event.target.name === "confirm_password"
    ) {
      setPassword((password) => ({
        ...password,
        [event.target.name]: event.target.value,
      }));
    } else if (event.target.name === "is_active") {
      setFormValue((formValue) => ({
        ...formValue,
        is_active: event.target.checked,
      }));
    } else {
      setFormValue((state) => ({
        ...state,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    props.onSubmit({...formValue, password: password.password})
  };

  return (
    <form onSubmit={submitForm} onReset={() => props.onClose()}>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="username"
          name="username"
          value={formValue.username}
          label="Name"
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
          type="password"
          id="password"
          name="password"
          value={formValue.password}
          label="Password"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={formValue.description}
          label="Confirm Password"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <FormControl required variant="standard" className="inputField">
          <InputLabel id="userTypeLabel">User Type</InputLabel>
          <Select
            labelId="userTypeLabel"
            id="user_type"
            name="user_type"
            value={formValue.user_type}
            onChange={handleChange}
          >
            {userTypes.map((userType, index) => (
              <MenuItem key={index} value={userType}>
                {userType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="inputContainer">
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="Is Active"
          name="is_active"
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

export default UserForm;
