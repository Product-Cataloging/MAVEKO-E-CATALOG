import React, { Component } from "react";
import { apiUrl } from "../../../environment";
import TableComponent from "../../../components/Table/Table";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
    };
  }

  componentDidMount() {
    fetch(`${apiUrl}/suppliers`)
      .then((response) => response.json())
      .then((response) => this.setState({ suppliers: response.data }));
  }

  render() {
    const rows = this.state.suppliers;

    const actions = [{ label: "Edit", name: "edit", color: 'var(--blue)' }];

    const columns = [
      { label: "Company Name", name: "company_name" },
      { label: "Email", name: "email" },
      { label: "Address Line", name: "address_line" },
      { label: "Primary Phone Number", name: "primary_phone_number" },
      { label: "Postal Code", name: "postal_code" },
      { label: "Fax", name: "fax" },
    ];

    return (
      <div>
        <TableComponent rows={rows} columns={columns} actions={actions} />
      </div>
    );
  }
}

export default Supplier;
