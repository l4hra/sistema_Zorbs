import Box from "@mui/material/Box";

import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Kanban from "../../components/KanbanList/KanbanBoard";
import CommandModal from "../../components/CreateCommand/CommandModal";

export default function NewCommands() {
  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "hidden" }}>
          
          <CommandModal />
          <Kanban />
        </Box>
      </Box>
    </div>
  );
}
