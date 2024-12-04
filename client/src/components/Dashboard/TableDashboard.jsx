import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Grid, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
  useGridApiRef,
} from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import * as XLSX from "xlsx";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement } from "chart.js";

// Registrar componentes do gráfico
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

function CustomToolbar({ apiRef }) {
  const handleExportToExcel = () => {
    const visibleRows = Array.from(apiRef.current.getSortedRowIds()).map((id) =>
      apiRef.current.getRow(id)
    );

    if (!visibleRows.length) return;

    const processedRows = visibleRows.map((row) => ({
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
    }));

    const worksheet = XLSX.utils.json_to_sheet(processedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Comandas");

    const columnWidths = [
      { wch: 30 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
    ];
    worksheet["!cols"] = columnWidths;

    XLSX.writeFile(workbook, "Relatorio_Comandas.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <Box sx={{ flexGrow: 1 }} />
        <button onClick={handleExportToExcel} style={buttonStyle}>
          Exportar para Excel
        </button>
        <button onClick={handlePrint} style={buttonStyle}>
          Imprimir
        </button>
      </GridToolbarContainer>
    </>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "8px",
  backgroundColor: "#054f77",
  color: "#fff",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  marginRight: "10px",
};

export default function TableDashboard({ startDate, endDate }) {
  const [rows, setRows] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [finalizedCount, setFinalizedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [chartType, setChartType] = useState("pie"); // Estado para controlar o tipo de gráfico
  const apiRef = useGridApiRef();

  const getCommands = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await fetch(
        `http://localhost:5000/commandsFilter?startDate=${startDate}&endDate=${endDate}`
      );
      const { rows } = await response.json();
      setRows(rows);

      // Calculando formas de pagamento e status
      const paymentCounts = {};
      let finalized = 0;
      let canceled = 0;
      let pending = 0;

      rows.forEach((row) => {
        if (row.payment && row.completed && !row.canceled) {
          paymentCounts[row.payment] = (paymentCounts[row.payment] || 0) + parseFloat(row.totalPrice || 0);
        }
        if (row.completed && !row.canceled) finalized++;
        if (row.canceled) canceled++;
        if (!row.completed && !row.canceled) pending++;
      });

      const paymentData = Object.entries(paymentCounts).map(([payment, total]) => ({
        payment,
        total,
      }));

      setPaymentData(paymentData);
      setFinalizedCount(finalized);
      setCanceledCount(canceled);
      setPendingCount(pending);
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
      width: 270,
      renderCell: (params) => <span>{`Pedido N°00${params.row?.id || ""}`}</span>,
    },
    {
      field: "totalPrice",
      headerName: "Total",
      width: 180,
      renderCell: (params) => {
        const total = parseFloat(params.row.totalPrice) || 0;
        return <span>{`R$${total.toFixed(2)}`}</span>;
      },
    },
    { field: "payment", headerName: "Forma de pagamento", width: 250 },
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
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px", textAlign: "center" }}>
        Relatório de Vendas
      </Typography>

      <Box sx={{ marginBottom: "40px" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          apiRef={apiRef}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[25]}
          slots={{
            toolbar: () => <CustomToolbar apiRef={apiRef} />,
          }}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
        />
      </Box>

      {/* Seletor de Tipo de Gráfico */}
      <Box sx={{ marginBottom: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="chart-type-label">Tipo de Gráfico</InputLabel>
          <Select
            labelId="chart-type-label"
            value={chartType}
            label="Tipo de Gráfico"
            onChange={(e) => setChartType(e.target.value)}
          >
            <MenuItem value="pie">Gráfico de Pizza</MenuItem>
            <MenuItem value="bar">Gráfico de Barras</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Gráfico de Formas de Pagamento */}
      <Box sx={{ marginBottom: "40px", maxWidth: "500px", margin: "0 auto" }}>
        <Typography variant="h6" gutterBottom>
          Formas de Pagamento Mais Vendidas ({finalizedCount} vendas finalizadas)
        </Typography>
        {chartType === "pie" ? (
          <Pie
            data={{
              labels: paymentData.map((item) => item.payment),
              datasets: [
                {
                  label: "Total de vendas",
                  data: paymentData.map((item) => item.total),
                  backgroundColor: ["#54a3ff", "#67ff6a", "#ff9a00", "#ff5757", "#2d4059"],
                  borderColor: "#fff",
                  borderWidth: 2,
                },
              ],
            }}
            height={100}
            width={100}
          />
        ) : (
          <Bar
            data={{
              labels: paymentData.map((item) => item.payment),
              datasets: [
                {
                  label: "Total de vendas",
                  data: paymentData.map((item) => item.total),
                  backgroundColor: ["#54a3ff", "#67ff6a", "#ff9a00", "#ff5757", "#2d4059"],
                  borderColor: "#fff",
                  borderWidth: 2,
                },
              ],
            }}
            height={100}
            width={100}
          />
        )}
      </Box>
    </Box>
  );
}
