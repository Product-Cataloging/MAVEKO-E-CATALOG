import React, { useEffect, useState } from "react";
import { get, add, edit } from "../../../services/AdminServices";
import { suppliers_path } from "../../../environment";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SupplierForm from "../Forms/SupplierForm";
import { style } from "../style";
import { useLocation } from "react-router-dom";

const Supplier = (props) => {
  const EMPTY_FORM = {
    id: null,
    company_name: "",
    email: "",
    address_line: "",
    primary_phone_number: "",
    postal_code: "",
    fax: "",
  };

  const [suppliers, setSuppliers] = useState([]);
  const [displayDialog, setDialog] = useState(false);
  const [formValue, setFormValue] = useState(EMPTY_FORM);

  const currentPath = useLocation();

  useEffect(() => {
    props.getUrl([{ label: "Suppliers", url: currentPath.pathname }]);

    get(suppliers_path)
      .then((response) => setSuppliers(response.data))
      .catch((err) => {
        props.message({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Suppliers",
          life: 3000,
        });
      });
  }, []);

  const submitForm = (event) => {
    const id = event.id;
    if (id === null) {
      delete event.id;
      add(event, suppliers_path)
        .then((response) => {
          setSuppliers((oldSuppliers) => [response.data, ...oldSuppliers]);
        })
        .catch((err) => {
          props.message({
            severity: "error",
            summary: "Error",
            detail: "Couldn't Add Supplier",
            life: 3000,
          });
        });
    } else {
      edit(id, event, suppliers_path)
        .then((response) => {
          const oldSuppliers = suppliers.filter((sup) => sup.id !== id);
          setSuppliers([response.data, ...oldSuppliers]);
        })
        .catch((err) => {
          props.message({
            severity: "error",
            summary: "Error",
            detail: "Couldn't Update Supplier",
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
    setFormValue(data, setDialog(true));
  };

  const rows = suppliers;

  const actions = [
    {
      label: "Edit",
      name: "edit",
      color: "var(--blue)",
      icon: "pi pi-pencil",
    },
  ];

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
        onClick={() => {
          setFormValue(EMPTY_FORM, setDialog(true));
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
        header="Suppliers From"
        draggable={false}
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setFormValue(EMPTY_FORM, setDialog(false));
        }}
      >
        <SupplierForm
          formValue={formValue}
          onSubmit={submitForm}
          onClose={() => {
            setFormValue(EMPTY_FORM, setDialog(false));
          }}
        />
      </Dialog>
    </div>
  );
};

export default Supplier;
