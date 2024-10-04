import React from "react";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import CommandCard from "../../components/Reports/CommandCard";
import Autocomplete from "@mui/joy/Autocomplete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function Dashboard({ title, color }) {
  const opt = [
    { id: 1, label: "Setembro" },
    { id: 2, label: "Agosto" },
  ];
  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Dashboard</h1>
          <Autocomplete placeholder="Mês" options={opt} sx={{ width: 300 }} />
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
              number={"R$ 2.5189,99"}
              icon={<CheckIcon />}
              subColor={"#9FD6D2"}
              qtdPedidos={"26 pedidos"}
            />
            <CommandCard
              title={"Comandas canceladas"}
              color={"#F90808"}
              number={"R$ 2.555,69"}
              icon={<ClearIcon />}
              subColor={"#C64444"}
              qtdPedidos={"6 pedidos"}
            />
          </div>
        </Box>
      </Box>
    </>
  );
}
