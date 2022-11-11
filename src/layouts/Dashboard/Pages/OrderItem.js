import { useEffect, useState } from "react";
import TableComponent from "../../../components/Table/Table";
import { get } from "../../../services/AdminServices";
import { useLocation } from "react-router-dom";

const OrderItem = (props) => {
  const [orderItems, setOrderItems] = useState([]);

  const currentPath = useLocation();

  useEffect(() => {
    props.getUrl([
      { label: "Orders", url: "/admin/orders" },
      { label: "Items", url: currentPath.pathname },
    ]);

    get("orders_items_path")
      .then((response) => {
        setOrderItems(response.data);
      })
      .catch((err) => {
        props.message({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Order Items",
          life: 3000,
        });
      });
  }, []);

  const rows = orderItems;

  const columns = [
    { label: "Product ID", name: "product_id" },
    { label: "Order Date", name: "order_date" },
    { label: "Delivery Date", name: "delivery_date" },
  ];

  return (
    <div>
      <TableComponent rows={rows} columns={columns} />
    </div>
  );
};

export default OrderItem;
