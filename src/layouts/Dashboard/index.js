import React, { useEffect, useState } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Supplier from "./Pages/Supplier";
import Product from "./Pages/Product";
import Order from "./Pages/Order";
import Quotation from "./Pages/Quotation";
import User from "./Pages/User";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";
import { style } from "./style";
import Notification from "./Pages/Notification";
import { Badge } from "primereact/badge";
import { unread_notifications_path, notifications_path } from "../../environment";
import { edit, get } from "../../services/AdminServices";

const Admin = (props) => {
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    get(unread_notifications_path).then((response) => {
      setNotifications(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const home = { icon: "pi pi-home", url: "/dashboard" };

  const currentUrl = (event) => {
    setBreadCrumb([event]);
  };

  const navigaetToUsersPage = () => {
    navigate("/users");
  };

  const navigaetToNotificationsPage = () => {
    navigate("/notifications");
  };

  const changeStatusToRead = (notification) => {
    edit(
      notification.id,
      { ...notification, status: "Read" },
      notifications_path
    ).then((response) => {
      setNotifications(notifications.filter((n) => n.id != response.data.id));
    });
  };

  const leftContents = (
    <React.Fragment>
      <BreadCrumb style={style.breadCrumb} model={breadCrumb} home={home} />
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <Button
        style={{ ...style.button, ...style.usersBtn }}
        className="p-button-raised p-button-text p-button-sm"
        icon="pi pi-users"
        label="Users"
        onClick={navigaetToUsersPage}
      />

      <Button
        style={{ ...style.circleButton, overflow: "visible" }}
        className="p-button-raised"
        onClick={navigaetToNotificationsPage}
      >
        <i className="pi pi-bell p-overlay-badge">
          <Badge
            value={notifications.length}
            style={{ fontSize: "10px" }}
            size="small"
            severity={notifications.length == 0 ? "secondary" : "info"}
          ></Badge>
        </i>
      </Button>
    </React.Fragment>
  );

  return (
    <div style={{ display: "flex", backgroundColor: "var(--gray)" }}>
      <DashboardNavbar />
      <div
        style={{
          padding: "15px",
          flexGrow: 1,
          maxHeight: "100vh",
          paddingRight: 20,
          overflow: "auto",
          boxSizing: "border-box",
        }}
      >
        <Toolbar
          style={style.headerToolbar}
          left={leftContents}
          right={rightContents}
        />
        <Routes>
          <Route
            exact
            path="/dashboard"
            element={<Dashboard getUrl={currentUrl} />}
          ></Route>
          <Route
            exact
            path="/suppliers"
            element={<Supplier getUrl={currentUrl} />}
          ></Route>
          <Route
            exact
            path="/products"
            element={<Product getUrl={currentUrl} />}
          ></Route>
          <Route 
            exact
            path="/orders"
            element={<Order getUrl={currentUrl} />}
          ></Route>
          <Route 
            exact
            path="/orders/:id"
            element={<Order getUrl={currentUrl} />}
          ></Route>
          <Route
            exact
            path="/quotations"
            element={<Quotation getUrl={currentUrl} />}
          ></Route>
          <Route
            exact
            path="/users"
            element={<User getUrl={currentUrl} />}
          ></Route>
          <Route
            exact
            path="/notifications"
            element={
              <Notification
                notifications={notifications}
                onReadNotification={changeStatusToRead}
                getUrl={currentUrl}
              />
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
