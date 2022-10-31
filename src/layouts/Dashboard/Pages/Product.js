import React, { Component } from "react";
import { apiUrl } from "../../../environment";
import TableComponent from "../../../components/Table/Table";

class Product extends Component {
  constructor(props) {
    super(props);
    this.props.getUrl({label: "Products", url: '/products'});
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/products`)
      .then((response) => response.json())
      .then((response) => this.setState({ products: response.data }));
  }

  render() {
    const rows = this.state.products;

    const actions = [
      { label: "Edit", name: "edit", color: "var(--blue)" },
      { label: "Items", name: "items", color: "var(--light-blue)" },
    ];

    const columns = [
      { label: "Product Name", name: "name" },
      { label: "Brand", name: "brand" },
      { label: "Description", name: "description" },
      { label: "Image Url", name: "image_url" },
      { label: "Category Name", name: "category_name" },
    ];

    return (
      <div>
        <TableComponent rows={rows} columns={columns} actions={actions} />
      </div>
    );
  }
}

export default Product;
