import React from "react";
import { Box } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";

export default function NewCommands() {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>oioi</h1>
        </Box>
      </Box>
    </div>
  );
}
