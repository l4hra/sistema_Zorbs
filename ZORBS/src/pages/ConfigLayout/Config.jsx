import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import { Sketch } from "@uiw/react-color";

export default function Config({ color }) {
  const [hex, setHex] = useState("#fff");

  return (
    <>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav color={hex} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Configuração</h1>
          <Sketch
            style={{ marginLeft: 20 }}
            color={hex}
            onChange={(color) => {
              setHex(color.hex);
            }}
          />
        </Box>
      </Box>
    </>
  );
}
