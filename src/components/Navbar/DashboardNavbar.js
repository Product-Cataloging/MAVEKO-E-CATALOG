import React, { Component } from "react";
import DashboardNavbarLink from "./DashboardNavbarLink";
class DashboardNavbar extends Component {
  state = {
    links: [
      {
        name: "Dashboard",
        route: "/dashboard",
        icon: <i className="pi pi-chart-bar"></i>,
      },
      {
        name: "Suppliers",
        route: "/suppliers",
        icon: <i className="pi pi-truck"></i>,
      },
      {
        name: "Products",
        route: "/products",
        icon: <i className="pi pi-box"></i>,
      },
      {
        name: "Quotation Requests",
        route: "/quotations",
        icon: <i className="pi pi-file"></i>,
      },
    ],
  };

  style = {
    wrapper: {
      height: "100vh",
      width: "280px",
      padding: "15px",
      color: "white",
      boxSizing: "border-box",
    },
    navbar: {
      height: "100%",
      backgroundColor: "var(--blue)",
      borderRadius: 10,
      padding: "20px",
      boxSizing: "border-box",
    },
    headerText: {
      textAlign: "center",
      margin: "0px",
      padding: 10,
    },
    horizontalLine: {
      borderTop: "0px solid var(--blue)",
      borderRight: "0px solid var(--blue)",
      borderLeft: "0px solid var(--blue)",
      borderBottom: "none",
      height: "1.6px",
      margin: "1rem 0px",
      opacity: 0.4,
      backgroundColor: "transparent",
      backgroundImage:
        "linear-gradient(to right, rgba(255, 255, 255, 0), rgb(255, 255, 255), rgba(255, 255, 255, 0))",
    },
    ul: {
      padding: 0,
    },
  };
  render() {
    return (
      <div style={this.style.wrapper}>
        <div style={this.style.navbar}>
          <h5 style={this.style.headerText}>MAVEKO DASHBOARD</h5>
          <hr style={this.style.horizontalLine} />
          <ul style={this.style.ul}>
            {this.state.links.map((link, index) => (
              <DashboardNavbarLink key={index} link={link} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DashboardNavbar;
