import React, { Component } from "react";
import { apiUrl } from "../../../environment";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SupplierForm from "../Forms/SupplierForm";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      displayDialog: false,
      formValue: {
        id: null,
        company_name: "",
        email: "",
        address_line: "",
        primary_phone_number: "",
        postal_code: "",
        fax: "",
      },
    };

    this.style = {
      button: {
        marginRight: 10,
        padding: "10px 30px",
        border: "none",
      },
      circleButton: {
        backgroundColor: "transparent",
        border: "none",
        padding: 8,
        borderRadius: "50%",
      },
      toolbar: {
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: "white",
      },
    };

    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    fetch(`${apiUrl}/suppliers`)
      .then((response) => response.json())
      .then((response) => this.setState({ suppliers: response.data }));
  }

  submitForm(event) {
    console.log(event.company_name.value);
    this.setState({ displayDialog: false });
  }

  render() {
    const rows = this.state.suppliers;

    const actions = [{ label: "Edit", name: "edit", color: "var(--blue)" }];

    const columns = [
      { label: "Company Name", name: "company_name" },
      { label: "Email", name: "email" },
      { label: "Address Line", name: "address_line" },
      { label: "Primary Phone Number", name: "primary_phone_number" },
      { label: "Postal Code", name: "postal_code" },
      { label: "Fax", name: "fax" },
    ];

    const leftContents = (
      <React.Fragment>
        <Button
          label="New"
          icon="pi pi-plus-circle"
          className="p-button-primary p-button-raised p-button-sm"
          style={{ backgroundColor: "var(--blue)", ...this.style.button }}
          onClick={() => this.setState({ displayDialog: true })}
        />
      </React.Fragment>
    );

    const rightContents = (
      <React.Fragment>
        <Button style={this.style.circleButton} className="p-button-raised">
          <i
            className="pi pi-bell"
            style={{ color: "var(--blue)" }}
          />
        </Button>
      </React.Fragment>
    );

    return (
      <div>
        <Toolbar
          style={this.style.toolbar}
          left={leftContents}
          right={rightContents}
        />
        <TableComponent rows={rows} columns={columns} actions={actions} />
        <Dialog
          header="Suppliers From"
          visible={this.state.displayDialog}
          style={{ width: "50vw" }}
          onHide={() => this.setState({ displayDialog: false })}
        >
          <SupplierForm
            formValue={this.state.formValue}
            onSubmit={this.submitForm}
            onClose={() => this.setState({ displayDialog: false })}
          />
        </Dialog>
      </div>
    );
  }
}

export default Supplier;
