import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableComponent from "../../../components/Table/Table";
import { get } from "../../../services/AdminServices";

const OrderItem = (props) => {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
    
  useEffect(() => {
    props.getUrl([{ label: "Orders", url: "/orders" }, {label: "Items", url: `/orders/${id}`}]);

    get('orders_items_path').then((response) => {
      setOrderItems(response.data);
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
      <TableComponent
        rows={rows}
        columns={columns}
      />
    </div>
  );
};

export default OrderItem;
