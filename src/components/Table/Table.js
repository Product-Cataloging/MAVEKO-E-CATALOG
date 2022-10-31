import React, { Component } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComponent = (props) => {
  const { rows, columns, actions } = props;

  return (
    <TableContainer style={{padding: '0 10px', borderRadius: 20, boxSizing: 'border-box'}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell style={{ fontWeight: "bold" }} key={column.name}>
                {column.label}
              </TableCell>
            ))}
            {actions && (
              <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.name}>{row[column.name]}</TableCell>
              ))}
              <TableCell style={{ fontWeight: "bolder" }}>
                {actions &&
                  actions.map((action) => (
                    <span
                      style={{
                        color: action.color,
                        textDecoration: "underline",
                        marginRight: 5,
                        cursor: "pointer",
                      }}
                      key={action.name}
                      onClick={() => props.handleAction({action, row})}
                    >
                      {action.label}
                    </span>
                  ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
