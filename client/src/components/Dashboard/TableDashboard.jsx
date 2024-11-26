import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { useEffect } from "react";

export default function TableDashboard({ startDate, endDate }) {
  const [rows, setRows] = useState([]);

  const getCommands = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `http://localhost:5000/commandsFilter?startDate=${startDate}&endDate=${endDate}`
      );
      const { rows } = await response.json();
      setRows(rows);
    } catch (error) {
      console.error("Erro ao buscar comandas:", error);
    }
  };

  useEffect(() => {
    getCommands();
  }, [startDate, endDate]);

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
      renderCell: (params) => {
        const total = parseFloat(params.row.totalPrice) || 0;
        return <span>{`R$${total.toFixed(2)}`}</span>;
      },
    },
    {
      field: "payment",
      headerName: "Forma de pagamento",
      width: 250,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const status = params.row.completed
          ? "Finalizada"
          : params.row.canceled
          ? "Cancelada"
          : "Pendente";
        return <span>{status}</span>;
      },
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
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
