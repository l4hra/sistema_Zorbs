import Box from "@mui/material/Box";

import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Kanban from "../../components/KanbanList/KanbanBoard";
import CommandModal from "../../components/CommandModal";

export default function NewCommands() {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "hidden" }}>
          <h1>Comandas</h1>
          <CommandModal />
          <Kanban />
        </Box>
      </Box>
    </div>
  );
}
