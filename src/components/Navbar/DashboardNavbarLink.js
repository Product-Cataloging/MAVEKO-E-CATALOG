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
      cursor: "pointer",
    },
    span: {
      padding: 15,
    },
    link: {
      color: "inherit",
      textDecoration: "none",
      padding: '5px',
      display: 'flex',
      alignItems: 'center'
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
  const resolvedPath = useResolvedPath(route);
  const isActive = useMatch({ path: resolvedPath.pathname, end: false });
  return (
    <li style={props.style} className={isActive ? "li active" : "li"}>
      {children}
    </li>
  );
}

export default DashboardNavbarLink;
