import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

const TableComponent = (props) => {
  const { rows, columns, actions, selection } = props;
  const [first, setFirst] = useState(10);

  const getActionButtons = (rowData) => {
    let buttons = actions.map((action) => (
      <Button
        style={{
          color: action.color,
          backgroundColor: "transparent",
          border: "none",
          marginRight: 5,
          cursor: "pointer",
          padding: "5",
          width: "fit-content",
        }}
        key={action.name}
        tooltip={action.label}
        tooltipOptions={{ position: "bottom" }}
        icon={action.icon}
        onClick={() => props.handleAction({ action, row: rowData })}
      ></Button>
    ));
    return buttons;
  };

  return (
    <div
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow:
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
      }}
    >
      <DataTable
        style={{ fontSize: "14px" }}
        value={rows}
        selectionMode="checkbox"
        selection={selection ? selection : ""}
        onSelectionChange={selection ? (e) => props.setSelections(e.value) : ""}
        dataKey="id"
        responsiveLayout="scroll"
        paginator
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Records"
        rows={10}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
      >
        {selection && (
          <Column
            style={{ backgroundColor: "white" }}
            selectionMode="multiple"
            headerStyle={{ width: "3em" }}
          ></Column>
        )}
        {columns.map((col) => (
          <Column
            style={{ backgroundColor: "white" }}
            key={col.name}
            field={col.name}
            header={col.label}
          ></Column>
        ))}
        {actions && (
          <Column
            header="Actions"
            style={{ backgroundColor: "white" }}
            headerStyle={{ width: "4rem", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
            body={getActionButtons}
          />
        )}
      </DataTable>
    </div>
  );
};

export default TableComponent;
