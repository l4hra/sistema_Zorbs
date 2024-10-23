import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

export default function TableDashboard() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "Período",
      width: 250,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Nome",
      width: 250,
      editable: true,
    },
    {
      field: "age",
      headerName: "Total comanda:",

      width: 250,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status:",

      width: 250,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      lastName: "Comanda#005",
      firstName: "05/10",
      age: "R$10,60",
      status: "Cancelada",
    },
    {
      id: 2,
      lastName: "Comanda#005",
      firstName: "10/10",
      age: "R$355,06",
      status: "Finalizada",
    },
    {
      id: 3,
      lastName: "Comanda#005",
      firstName: "15/10",
      age: "R$85,00",
      status: "Cancelada",
    },
    {
      id: 4,
      lastName: "Comanda#005",
      firstName: "19/10",
      age: "R$45,66",
      status: "Finalizada",
    },
    {
      id: 5,
      lastName: "Comanda#005",
      firstName: "20/10",
      age: "R$15,66",
      status: "Finalizada",
    },
    {
      id: 6,
      lastName: "Comanda#005",
      firstName: "25/10",
      age: "R$15,66",
      status: "Finalizada",
    },
    {
      id: 7,
      lastName: "Comanda#005",
      firstName: "30/10",
      age: "R$71,66",
      status: "Finalizada",
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "85%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
