import React from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import { useState } from "react";
import { useEffect } from "react";

function CustomToolbar({ columns, rows }) {
  const processRow = (row) => {
    return {
      "Nome comanda": `Pedido N°00${row.id || ""}`,
      Total: `R$${(parseFloat(row.totalPrice) || 0).toFixed(2)}`,
      "Forma de pagamento": row.payment,
      Status: row.completed
        ? "Finalizada"
        : row.canceled
        ? "Cancelada"
        : "Pendente",
      "Data de criação": row.date_opening
        ? new Date(row.date_opening).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "-",
    };
  };

  const handleExport = () => {
    const processedRows = rows.map(processRow);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(processedRows[0]).join(","),
        ...processedRows.map((row) => Object.values(row).join(",")),
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dados_comandas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Box sx={{ flexGrow: 1 }} />
      <button
        onClick={handleExport}
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#054f77",
          color: "#fff",
          border: "none",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0678a2")} // Hover Effect
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#054f77")} // Remove Hover Effect
      >
        Exportar
      </button>
    </GridToolbarContainer>
  );
}

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
      width: 250,
      renderCell: (params) => {
        return <span>{`Pedido N°00${params.row?.id || ""}`}</span>;
      },
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 250,
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
      width: 260,
      renderCell: (params) => {
        const status = params.row.completed
          ? "Finalizada"
          : params.row.canceled
          ? "Cancelada"
          : "Pendente";
        return <span>{status}</span>;
      },
    },
    {
      field: "date_opening",
      headerName: "Data de criação",
      width: 250,
      renderCell: (params) => {
        const rawDate = params.row.date_opening;
        if (!rawDate) return <span>-</span>;

        const formattedDate = new Date(rawDate).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

        return <span>{formattedDate}</span>;
      },
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "85%" }}>
        <DataGrid
          sx={{
            padding: "5px",
            boxShadow: 2,
            border: "none",
          }}
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
          slots={{
            toolbar: () => <CustomToolbar rows={rows} columns={columns} />,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
