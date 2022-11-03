import React, { useEffect, useState } from "react";
import { apiUrl } from "../../../environment";
import TableComponent from "../../../components/Table/Table";
import { Tag } from "primereact/tag";

const Quotation = (props) => {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    props.getUrl({ label: "Quotations", url: "/quotations" });

    fetch(`${apiUrl}/quotation_requests`)
      .then((response) => response.json())
      .then((response) => {
        response.data.map((res, index) => {
          response.data[index].image_url = (
            <a href={res.image_url} target="_blank">
              {res.image_url.substr(0, 25)}...
            </a>
          );
          let severity = "primary";
          if (res.status === "Addressed") {
            severity = "success";
          } else if (res.status === "Processing") {
            severity = "warning";
          }
          response.data[index].status = (
            <Tag severity={severity}>{res.status}</Tag>
          );
        });
        setQuotations(response.data);
      });
  }, []);

  const rows = quotations;

  const columns = [
    { label: "First Name", name: "first_name" },
    { label: "Last Name", name: "last_name" },
    { label: "Email", name: "email" },
    { label: "Phone Number", name: "phone_number" },
    { label: "Product Name", name: "product_name" },
    { label: "Quantity", name: "quantity" },
    { label: "Description", name: "description" },
    { label: "Image Url", name: "image_url" },
    { label: "Status", name: "status" },
  ];

  return (
    <div>
      <TableComponent rows={rows} columns={columns} />
    </div>
  );
};

export default Quotation;
