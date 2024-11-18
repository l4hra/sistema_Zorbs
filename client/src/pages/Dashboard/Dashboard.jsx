import React from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import CommandCard from "../../components/Reports/CommandCard";
import Autocomplete from "@mui/joy/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TableDashboard from "../../components/Dashboard/TableDashboard";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { ptBR } from "@mui/x-date-pickers/locales";
import "dayjs/locale/pt-br"; // Importação do locale do Dayjs
import dayjs from "dayjs";
import { useState } from "react";
import { useEffect } from "react";

export default function Dashboard({ title, color }) {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [completedCount, setCompletedCount] = useState(0);
  const [canceledCount, setCanceledCount] = useState(0);
  const [completeProfit, setCompleteProfit] = useState(0);
  const [canceledProfit, setCanceledProfit] = useState(0);

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date.$d).format("YYYY-MM-DD"); // Formata a data para 'YYYY-MM-DD'
    setSelectedDate(formattedDate);
  };

  const fetchCommandStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/commandsFilter?date=${selectedDate}`
      );
      const data = await response.json();
      setCompletedCount(data.statusCount.complete || 0);
      setCanceledCount(data.statusCount.canceled || 0);
      setCompleteProfit(data.statusCount.completeProfit || 0);
      setCanceledProfit(data.statusCount.canceledProfit || 0);
    } catch (error) {
      console.error("Erro ao buscar status das comandas:", error);
    }
  };

  useEffect(() => {
    fetchCommandStatus();
  }, [selectedDate]);

  dayjs.locale("pt-br");
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "2rem",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <h2>Dashboard</h2>
            {/* <Autocomplete placeholder="Mês" options={opt} sx={{ width: 300 }} /> */}

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Filtre as comandas"
                  format="DD/MM/YYYY"
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10rem",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <CommandCard
              title={"Comandas finalizadas"}
              color={"#09A176"}
              number={`R$${completeProfit}`}
              icon={<CheckIcon />}
              subColor={"#9FD6D2"}
              qtdPedidos={`${completedCount} pedidos`}
            />
            <CommandCard
              title={"Comandas canceladas"}
              color={"#F90808"}
              number={`R$${canceledProfit}`}
              icon={<ClearIcon />}
              subColor={"#C64444"}
              qtdPedidos={`${canceledCount} pedidos`}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "5rem",
              flexDirection: "column",
            }}
          >
            {/* <LineChart /> */}

            <TableDashboard selectedDate={selectedDate} />
          </div>
        </Box>
      </Box>
    </>
  );
}
