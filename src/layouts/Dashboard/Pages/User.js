import React from "react";
import TableComponent from "../../../components/Table/Table";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import { signup_path, users_path } from "../../../environment";
import { get, add, edit } from "../../../services/AdminServices";
import { style } from "../style";
import UserForm from "../Forms/UserForm";

const User = (props) => {
  const EMPTY_FORM = {
    id: null,
    username: "",
    email: "",
    user_type: "Operator",
    is_active: true,
  };

  const [formValue, setFormValue] = useState(EMPTY_FORM);
  const [users, setUsers] = useState([]);
  const [displayDialog, setDialog] = useState(false);

  useEffect(() => {
    props.getUrl({ label: "Users", url: "/users" });
    get(users_path).then((response) => setUsers(response.data));
  }, []);

  const submitForm = (event) => {
    delete event.id;
    add(event, signup_path).then((response) => {
      setUsers((users) => [response.data, ...users]);
    });
    setDialog(false);
  };

  const rows = [...users];

  const columns = [
    { label: "Name", name: "username" },
    { label: "Email", name: "email" },
    { label: "User Type", name: "user_type" },
    { label: "Active Status", name: "is_active" },
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
  const actions = [{ label: "Edit", name: "edit", color: "var(--blue)", icon: 'pi pi-pencil' }];
const handleActionClick = ()=>{};
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
        />
      <Dialog
        header="Products From"
        visible={displayDialog}
        style={{ width: "50vw" }}
        onHide={() => {
          setFormValue(EMPTY_FORM);
          setDialog(false);
        }}
      >
        <UserForm
          formValue={formValue}
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

export default User;
