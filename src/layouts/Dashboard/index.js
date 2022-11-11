import React, { useEffect, useRef, useState } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import {
  unread_notifications_path,
  notifications_path,
} from "../../environment";
import { edit, get } from "../../services/AdminServices";
import OrderItem from "./Pages/OrderItem";
import "../../components/Navbar/navbar-transition.css";
import { Toast } from "primereact/toast";

const Admin = (props) => {
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [navBarOpen, toggleNabBar] = useState(true);

  const toast = useRef(null);

  useEffect(() => {
    get(unread_notifications_path)
      .then((response) => {
        setNotifications(response.data);
      })
      .catch((err) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Notifications",
          life: 3000,
        });
      });
  }, []);

  const navigate = useNavigate();

  const home = { icon: "pi pi-home", url: "/admin/dashboard" };

  const currentUrl = (event) => {
    setBreadCrumb(event);
  };

  const navigaetToUsersPage = () => {
    navigate("/admin/users");
  };

  const navigaetToNotificationsPage = () => {
    navigate("/admin/notifications");
  };

  const changeStatusToRead = (notification) => {
    edit(
      notification.id,
      { ...notification, status: "Read" },
      notifications_path
    ).then((response) => {
      setNotifications(notifications.filter((n) => n.id !== response.data.id));
    });
  };

  const addMessage = (event) => {
    toast.current.show({
      severity: event.severity,
      summary: event.summary,
      detail: event.detail,
      life: event.life,
    });
  };

  const leftContents = (
    <React.Fragment>
      <i
        style={style.menuBar}
        onClick={() => {
          toggleNabBar((status) => !status);
        }}
        className="pi pi-bars"
      ></i>
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
            severity={notifications.length === 0 ? "secondary" : "info"}
          ></Badge>
        </i>
      </Button>
    </React.Fragment>
  );

  return (
    <div style={{ display: "flex", backgroundColor: "var(--gray)" }}>
      <div className={navBarOpen ? "navbar" : "navbar hide"}>
        <DashboardNavbar />
      </div>
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
        <Toast ref={toast} />
        <Toolbar
          style={style.headerToolbar}
          left={leftContents}
          right={rightContents}
        />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          ></Route>
          <Route
            path="/dashboard"
            element={<Dashboard getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/suppliers"
            element={<Supplier getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/products"
            element={<Product getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/orders"
            element={<Order getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/orders/:id"
            element={<OrderItem getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/quotations"
            element={<Quotation getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/users"
            element={<User getUrl={currentUrl} message={addMessage} />}
          ></Route>
          <Route
            path="/notifications"
            element={
              <Notification
                notifications={notifications}
                onReadNotification={changeStatusToRead}
                getUrl={currentUrl}
                message={addMessage}
              />
            }
          ></Route>
          <Route
            path="*"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
