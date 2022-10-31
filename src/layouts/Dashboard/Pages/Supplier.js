import React, { Component } from "react";
import { get, add, edit } from "../../../services/AdminServices";
import { suppliers_path } from "../../../environment";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SupplierForm from "../Forms/SupplierForm";
import {style} from '../style';
class Supplier extends Component {
  constructor(props) {
    super(props);
    this.props.getUrl({label: "Suppliers", url: '/suppliers'});
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

    this.submitForm = this.submitForm.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  componentDidMount() {
    get(suppliers_path).then((response) => this.setState({ suppliers: response.data }));
  }

  submitForm(event) {
    const id = event.id;
    if (id === null) {
      delete event.id;
      add(event, suppliers_path).then((response) => {
        this.setState((state) => ({
          suppliers: [...state.suppliers, response.data],
        }));
      });
    } else {
      edit(id, event, suppliers_path).then((response) => {
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

    const actions = [{ label: "Edit", name: "edit", color: "var(--blue)", icon: 'pi pi-pencil' }];

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
          style={{ backgroundColor: "var(--blue)", ...style.button }}
          onClick={() =>
            this.setState({ formValue: this.EMPTY_FORM, displayDialog: true })
          }
        />
      </React.Fragment>
    );

    const rightContents = (
      <React.Fragment>

      </React.Fragment>
    );

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
