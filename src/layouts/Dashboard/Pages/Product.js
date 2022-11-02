import React, { Component } from "react";
import { products_path, categories_path } from "../../../environment";
import { get, add, edit } from "../../../services/AdminServices";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ProductForm from "../Forms/ProductForm";
import { style } from "../style";

class Product extends Component {
  constructor(props) {
    super(props);
    this.props.getUrl({ label: "Products", url: "/products" });
    this.EMPTY_FORM = {
      id: null,
      name: "",
      brand: "",
      description: "",
      image_url: "",
      category_id: "",
    };
    this.state = {
      products: [],
      categories: [],
      displayDialog: false,
      formValue: this.EMPTY_FORM,
    };
    this.submitForm = this.submitForm.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  componentDidMount() {
    get(products_path).then((response) => {
      response.data.map((res, index) => {
        response.data[index].image_url = (
          <a href={res.image_url} target="_blank">
            {res.image_url.substr(0, 25)}...
          </a>
        );
      });
      this.setState({ products: response.data });
    });

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

  submitForm(event) {
    const id = event.id;
    if (id === null) {
      delete event.id;
      add(event, products_path).then((response) => {
        this.setState((state) => ({
          products: [...state.products, response.data],
        }));
      });
    } else {
      edit(id, event, products_path).then((response) => {
        const products = this.state.products.filter(
          (product) => product.id !== id
        );
        this.setState({
          products: [response.data, ...products],
        });
      });
    }
    this.setState({ displayDialog: false });
  }

  handleActionClick(event) {
    switch (event.action.name) {
      case "edit":
        this.editActionClick(event.row);
        break;
      default:
        console.log("Action name didn't match any key");
        return;
    }
  }

  editActionClick(data) {
    this.setState({ formValue: data, displayDialog: true });
  }

  render() {
    const rows = this.state.products;

    const actions = [
      {
        label: "Edit",
        name: "edit",
        color: "var(--blue)",
        icon: "pi pi-pencil",
      },
      {
        label: "Items",
        name: "items",
        color: "var(--light-blue)",
        icon: "pi pi-list",
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
          onClick={() =>
            this.setState({ formValue: this.EMPTY_FORM, displayDialog: true })
          }
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
          handleAction={this.handleActionClick}
        />
        <Dialog
          header="Products From"
          visible={this.state.displayDialog}
          style={{ width: "50vw" }}
          onHide={() =>
            this.setState({ formValue: this.EMPTY_FORM, displayDialog: false })
          }
        >
          <ProductForm
            formValue={this.state.formValue}
            categories={this.state.categories}
            onSubmit={this.submitForm}
            onClose={() =>
              this.setState({
                formValue: this.EMPTY_FORM,
                displayDialog: false,
              })
            }
          />
        </Dialog>
      </div>
    );
  }
}

export default Product;
