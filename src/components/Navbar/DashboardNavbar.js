import DashboardNavbarLink from "./DashboardNavbarLink";

const DashboardNavbar = (props) => {
  const links = [
    {
      name: "Dashboard",
      route: "/admin/dashboard",
      icon: <i className="pi pi-chart-bar"></i>,
    },
    {
      name: "Suppliers",
      route: "/admin/suppliers",
      icon: <i className="pi pi-truck"></i>,
    },
    {
      name: "Products",
      route: "/admin/products",
      icon: <i className="pi pi-box"></i>,
    },
    {
      name: "Orders",
      route: "/admin/orders",
      icon: <i className="pi pi-shopping-cart"></i>,
    },
    {
      name: "Quotation Requests",
      route: "/admin/quotations",
      icon: <i className="pi pi-file"></i>,
    },
  ];

  const style = {
    wrapper: {
      height: "100vh",
      minWidth: "280px",
      maxWidth: "280px",
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
      display: "flex",
      overflowY: "auto",
      flexDirection: "column",
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
      flexGrow: 1,
    },
    signout: {
      textAlign: "center",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-around",
      width: "100px",
      margin: "auto",
    },
  };
  return (
    <div style={style.wrapper}>
      <div style={style.navbar}>
        <h5 style={style.headerText}>MAVEKO DASHBOARD</h5>
        <hr style={style.horizontalLine} />
        <ul style={style.ul}>
          {links.map((link, index) => (
            <DashboardNavbarLink key={index} link={link} />
          ))}
        </ul>
        <hr style={style.horizontalLine} />
        <div style={style.signout} onClick={props.signout}>
          <span>Signout</span>
          <i className="pi pi-sign-out"></i>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
