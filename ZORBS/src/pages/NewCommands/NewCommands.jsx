import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Sidenav from "../../components/Sidenav";
import Navbar from "../../components/Navbar";
import Kanban from "../../components/KanbanList/KanbanBoard";
import { useState } from "react";

export default function NewCommands() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Navbar />
      <Box height={30} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Comandas</h1>
          <div>
            <Button
              onClick={handleOpen}
              sx={{ backgroundColor: "#9FD6D2", color: "#fff" }}
            >
              + Nova comanda
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 400,
                  bgcolor: "background.paper",
                  border: "2px solid #000",
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Nova comanda
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Aqui vai estar as informações da comanda nova
                </Typography>
              </Box>
            </Modal>
          </div>
          <Kanban />
        </Box>
      </Box>
    </div>
  );
}
