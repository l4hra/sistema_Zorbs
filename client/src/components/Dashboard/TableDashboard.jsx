import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { useEffect } from "react";

export default function TableDashboard() {
  const [rows, setRows] = useState([]);

  const getCommands = async () => {
    try {
      const response = await fetch("http://localhost:5000/commands");
      const data = await response.json();
      console.log("data", data);
      setRows(data);
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
    }
  };

  useEffect(() => {
    getCommands();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Nome comanda",
      width: 150,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 150,
    },
    {
      field: "payment",
      headerName: "Forma de pagamento",

      width: 250,
    },
    {
      field: "oi",
      headerName: "Status",

      width: 160,
    }
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
