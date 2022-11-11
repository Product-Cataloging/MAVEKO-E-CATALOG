import { useEffect, useState } from "react";
import "./style.css";
import TextField from "@mui/material/TextField";
import { Button } from "primereact/button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const ProductForm = (props) => {
  const [formValue, setFormValue] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setFormValue(props.formValue);
    setCategories(props.categories);
  }, []);

  const handleChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
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
          id="name"
          name="name"
          value={formValue.name}
          label="Product Name"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          id="brand"
          name="brand"
          value={formValue.brand}
          label="Brand"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          required
          id="image_url"
          name="image_url"
          value={formValue.image_url}
          label="Image Url"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <TextField
          className="inputField"
          id="description"
          name="description"
          multiline
          rows={3}
          value={formValue.description}
          label="Description"
          variant="standard"
          onChange={handleChange}
        />
      </div>
      <div className="inputContainer">
        <FormControl required variant="standard" className="inputField">
          <InputLabel id="categoryLabel">Product Category</InputLabel>
          <Select
            labelId="categoryLabel"
            id="category_id"
            name="category_id"
            value={formValue.category_id}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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

export default ProductForm;
