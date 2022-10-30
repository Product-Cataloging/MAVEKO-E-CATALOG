import "./style.css";
import { Link, useResolvedPath, useMatch } from "react-router-dom";

function DashboardNavbarLink(props) {
  const link = { ...props.link };
  const style = {
    li: {
      fontWeight: "normal",
      fontSize: 14,
      listStyle: "none",
      marginBottom: 2,
      borderRadius: 5,
      padding: 15,
      cursor: "pointer",
    },
    span: {
      padding: 15,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
    },
  };
  return (
    <CustomLink style={style.li} route={link.route}>
      <Link to={link.route} style={style.link}>
        <span style={style.span}>{link.icon}</span>
        <span>{link.name}</span>
      </Link>
    </CustomLink>
  );
}

function CustomLink({ route, children, ...props }) {
  const path = window.location.pathname;
  const resolvedPath = useResolvedPath(route);
  const isActive = useMatch({ path: resolvedPath.pathname });
  return (
    <li style={props.style} className={isActive ? "li active" : "li"}>
      {children}
    </li>
  );
}

export default DashboardNavbarLink;
