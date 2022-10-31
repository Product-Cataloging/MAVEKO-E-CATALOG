import React, { Component } from "react";
import { get, add, edit } from "../../../services/SupplierService";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SupplierForm from "../Forms/SupplierForm";

class Supplier extends Component {
  constructor(props) {
    super(props);
    this.EMPTY_FORM = {
      id: null,
      company_name: "",
      email: "",
      address_line: "",
      primary_phone_number: "",
      postal_code: "",
      fax: "",
    };

    this.state = {
      suppliers: [],
      displayDialog: false,
      formValue: this.EMPTY_FORM,
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
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  componentDidMount() {
    get().then((response) => this.setState({ suppliers: response.data }));
  }

  submitForm(event) {
    const id = event.id;
    if (id === null) {
      delete event.id;
      add(event).then((response) => {
        this.setState((state) => ({
          suppliers: [...state.suppliers, response.data],
        }));
      });
    } else {
      edit(id, event).then((response) => {
        const suppliers = this.state.suppliers.filter(
          (supplier) => supplier.id !== id
        );
        this.setState({
          suppliers: [response.data, ...suppliers],
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
          onClick={() =>
            this.setState({ formValue: this.EMPTY_FORM, displayDialog: true })
          }
        />
      </React.Fragment>
    );

    const rightContents = (
      <React.Fragment>
        <Button style={this.style.circleButton} className="p-button-raised">
          <i className="pi pi-bell" style={{ color: "var(--blue)" }} />
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
        <TableComponent
          rows={rows}
          columns={columns}
          actions={actions}
          handleAction={this.handleActionClick}
        />
        <Dialog
          header="Suppliers From"
          visible={this.state.displayDialog}
          style={{ width: "50vw" }}
          onHide={() =>
            this.setState({ formValue: this.EMPTY_FORM, displayDialog: false })
          }
        >
          <SupplierForm
            formValue={this.state.formValue}
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

export default Supplier;
