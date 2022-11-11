import React, { useEffect, useState } from "react";
import { quotation_path } from "../../../environment";
import TableComponent from "../../../components/Table/Table";
import { Tag } from "primereact/tag";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { style } from "../style";
import { get, edit } from "../../../services/AdminServices";
import { useLocation } from "react-router-dom";

const Quotation = (props) => {
  const [quotations, setQuotations] = useState([]);
  const [tableSelections, setSelections] = useState([]);

  const currentPath = useLocation();

  useEffect(() => {
    props.getUrl([{ label: "Quotations", url: currentPath.pathname }]);

    get(quotation_path)
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
      })
      .catch((err) => {
        props.message({
          severity: "error",
          summary: "Error",
          detail: "Couldn't Get List of Quotations",
          life: 3000,
        });
      });
  }, []);

  const changeStatus = (status) => {
    let quotationsList = [...quotations];
    let length = tableSelections.length;
    let counter = 0;
    tableSelections.map((item) => {
      edit(item.id, { status: status }, quotation_path).then(
        async (response) => {
          response.data.image_url = (
            <a href={response.data.image_url} target="_blank">
              {response.data.image_url.substr(0, 25)}...
            </a>
          );
          let severity = "primary";
          if (response.data.status === "Addressed") {
            severity = "success";
          } else if (response.data.status === "Processing") {
            severity = "warning";
          }
          response.data.status = (
            <Tag severity={severity}>{response.data.status}</Tag>
          );
          var index = quotations.findIndex(
            (quo) => quo.id === response.data.id
          );
          quotationsList[index] = response.data;
          counter++;
          if (counter === length) {
            //to make sure setQuotations is only called after each item has been updated
            setQuotations(quotationsList);
          }
        },
        (error) => {
          props.message({
            severity: "error",
            summary: "Error",
            detail: "Couldn't Update Quotation",
            life: 3000,
          });
        }
      );
    });
  };

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

  const rightContents = (
    <React.Fragment>
      <Button
        label="Processing"
        icon="pi pi-clock"
        className="p-button-warning p-button-raised p-button-sm"
        style={style.button}
        disabled={tableSelections.length < 1}
        onClick={() => changeStatus("Processing")}
      />
      <Button
        label="Addressed"
        icon="pi pi-check-circle"
        className="p-button-success p-button-raised p-button-sm"
        style={style.button}
        disabled={tableSelections.length < 1}
        onClick={() => changeStatus("Addressed")}
      />
    </React.Fragment>
  );

  return (
    <div>
      {localStorage.getItem("role") === "Operator" && (
        <Toolbar style={style.toolbar} right={rightContents} />
      )}
      <TableComponent
        rows={rows}
        columns={columns}
        selection={
          localStorage.getItem("role") === "Operator" && tableSelections
        }
        handleSelection={(event) => {
          setSelections(event);
        }}
      />
    </div>
  );
};

export default Quotation;
