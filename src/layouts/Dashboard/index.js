import React, { Component } from "react";
import DashboardNavbar from "../../components/Navbar/DashboardNavbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Supplier from "./Pages/Supplier";
import Product from "./Pages/Product";
import ProductItem from "./Pages/ProductItem";
import Quotation from "./Pages/Quotation";
import User from "./Pages/User";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { BreadCrumb } from "primereact/breadcrumb";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { breadCrumb: [] };
    this.style = {
      circleButton: {
        backgroundColor: "transparent",
        border: "none",
        padding: 8,
        borderRadius: "50%",
      },
      toolbar: {
        marginBottom: 10,
        backgroundColor: "transparent",
        border: "none",
      },
      breadCrumb: {
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '14px',
      }
    };
    this.currentUrl = this.currentUrl.bind(this);
  }

  home = { icon: "pi pi-home", url: "/dashboard" };

  currentUrl(event) {
    this.setState({ breadCrumb: [event] });
  }

  render() {
    const leftContents = (
      <React.Fragment>
        <BreadCrumb style={this.style.breadCrumb} model={this.state.breadCrumb} home={this.home} />
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
            style={this.style.toolbar}
            left={leftContents}
            right={rightContents}
          />
          <Routes>
            <Route
              exact
              path="/dashboard"
              element={<Dashboard getUrl={this.currentUrl} />}
            ></Route>
            <Route
              exact
              path="/suppliers"
              element={<Supplier getUrl={this.currentUrl} />}
            ></Route>
            <Route
              exact
              path="/products"
              element={<Product getUrl={this.currentUrl} />}
            ></Route>
            <Route
              exact
              path="/products/:id"
              element={<ProductItem getUrl={this.currentUrl} />}
            ></Route>
            <Route
              exact
              path="/quotations"
              element={<Quotation getUrl={this.currentUrl} />}
            ></Route>
            <Route
              exact
              path="/users"
              element={<User getUrl={this.currentUrl} />}
            ></Route>
          </Routes>
        </div>
      </div>
    );
  }
}

export default Admin;
