import React, { useEffect, useState } from "react";
import { products_path, categories_path } from "../../../environment";
import { get, add, edit } from "../../../services/AdminServices";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ProductForm from "../Forms/ProductForm";
import { style } from "../style";
import { useLocation } from "react-router-dom";

const Product = (props) => {
  const EMPTY_FORM = {
    id: null,
    name: "",
    brand: "",
    description: "",
    image_url: "",
    category_id: "",
  };

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [displayDialog, setDialog] = useState(false);
  const [formValue, setFormValue] = useState(EMPTY_FORM);

  const currentPath = useLocation();

  useEffect(() => {
    props.getUrl([{ label: "Products", url: currentPath.pathname }]);

    get(products_path)
      .then((response) => {
        response.data.map((res, index) => {
          response.data[index].image_url = (
            <a href={res.image_url} target="_blank">
              {res.image_url.substr(0, 25)}...
            </a>
          );
        });
        setProducts(response.data);
      })
      .catch((err) => {
        props.message({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Products",
          life: 3000,
        });
      });

    get(categories_path)
      .then((response) => {
        let data = response.data;
        let categoriesList = [];
        for (const key in data) {
          if (data[key].children.length > 0) {
            data[key].children.forEach((category) => {
              categoriesList.push(category);
            });
          }
        }
        setCategories(categoriesList);
      })
      .catch((err) => {
        props.message({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Categories",
          life: 3000,
        });
      });
  }, []);

  const submitForm = (event) => {
    const id = event.id;
    if (id === null) {
      delete event.id;
      add(event, products_path)
        .then((response) => {
          setProducts((prevProducts) => [...prevProducts, response.data]);
        })
        .catch((err) => {
          props.message({
            severity: "error",
            summary: "Error",
            detail: "Couldn't Add Product",
            life: 3000,
          });
        });
    } else {
      edit(id, event, products_path)
        .then((response) => {
          const oldProducts = products.filter((product) => product.id !== id);
          response.data.image_url = (
            <a href={response.data.image_url} target="_blank">
              {response.data.image_url.substr(0, 25)}...
            </a>
          );
          setProducts([response.data, ...oldProducts]);
        })
        .catch((err) => {
          props.message({
            severity: "error",
            summary: "Error",
            detail: "Couldn't Update Product",
            life: 3000,
          });
        });
    }
    setDialog(false);
  };

  const handleActionClick = (event) => {
    switch (event.action.name) {
      case "edit":
        editActionClick(event.row);
        break;
      default:
        console.log("Action name didn't match any key");
        return;
    }
  };

  const editActionClick = (data) => {
    setFormValue(
      { ...data, image_url: data.image_url.props.href },
      setDialog(true)
    );
  };

  const rows = products;

  const actions = [
    {
      label: "Edit",
      name: "edit",
      color: "var(--blue)",
      icon: "pi pi-pencil",
    },
  ];

  const columns = [
    { label: "Product Name", name: "name" },
    { label: "Brand", name: "brand" },
    { label: "Description", name: "description" },
    { label: "Image Url", name: "image_url" },
    { label: "Category Name", name: "category_name" },
  ];

  const leftContents = (
    <React.Fragment>
      <Button
        label="New"
        icon="pi pi-plus-circle"
        className="p-button-primary p-button-raised p-button-sm"
        style={{ backgroundColor: "var(--blue)", ...style.button }}
        onClick={() => {
          setFormValue(EMPTY_FORM);
          setDialog(true);
        }}
      />
    </React.Fragment>
  );

  const rightContents = <React.Fragment></React.Fragment>;

  return (
    <div>
      <Toolbar
        style={style.toolbar}
        left={leftContents}
        right={rightContents}
      />
      <TableComponent
        rows={rows}
        columns={columns}
        actions={actions}
        handleAction={handleActionClick}
      />
      <Dialog
        header="Products From"
        draggable={false}
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setFormValue(EMPTY_FORM);
          setDialog(false);
        }}
      >
        <ProductForm
          formValue={formValue}
          categories={categories}
          onSubmit={submitForm}
          onClose={() => {
            setFormValue(EMPTY_FORM);
            setDialog(false);
          }}
        />
      </Dialog>
    </div>
  );
};

export default Product;
