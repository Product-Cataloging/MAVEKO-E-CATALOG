import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../../components/Table/Table";
import { get } from "../../../services/AdminServices";
import { useLocation } from "react-router-dom";

const Order = (props) => {
  const [orders, setOrders] = useState([]);

  const currentPath = useLocation();

  useEffect(() => {
    props.getUrl([{ label: "Orders", url: currentPath.pathname }]);

    get("orders_path").then((response) => {
      setOrders(response.data);
    });
  }, []);

  const navigate = useNavigate();

  const handleActionClick = (event) => {
    switch (event.action.name) {
      case "items":
        navigate(`/orders/${event.row.id}`);
        break;
      default:
        console.log("Action name didn't match any key");
        return;
    }
  };

  const rows = orders;

  const actions = [
    {
      label: "Items",
      name: "items",
      color: "var(--light-blue)",
      icon: "pi pi-list",
    },
  ];

  const columns = [
    { label: "Order ID", name: "id" },
    { label: "User ID", name: "user_id" },
    { label: "Quantity", name: "quantity" },
    { label: "Price", name: "price" },
    { label: "Order Status", name: "order_status" },
  ];

  return (
    <div>
      <TableComponent
        rows={rows}
        columns={columns}
        actions={actions}
        handleAction={handleActionClick}
      />
    </div>
  );
};

export default Order;
