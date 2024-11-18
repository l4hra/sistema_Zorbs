import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { useEffect } from "react";

export default function TableDashboard({ selectedDate }) {
  const [rows, setRows] = useState([]);
  // const nameCommand = "Pedido"

  const getCommands = async () => {
    if (!selectedDate) return;
    try {
      const response = await fetch(
        `http://localhost:5000/commandsFilter?date=${selectedDate}`
      );
      const { rows } = await response.json();
      setRows(rows);
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
    }
  };

  useEffect(() => {
    getCommands();
  }, [selectedDate]);

  const columns = [
    {
      field: "name",
      headerName: "Nome comanda",
      width: 150,
      renderCell: (params) => {
        return <span>{`Pedido N°00${params.row?.id || ""}`}</span>;
      },
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
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[25]}
          checkboxSelection
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
