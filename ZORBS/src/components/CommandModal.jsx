import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

export default function CommandModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const listItems = [
    { id: 1, title: "Coca-cola" },
    { id: 2, title: "Água com gás" },
    { id: 3, title: "Coca-cola" },
  ];

  const listItemsFoods = [
    { id: 1, title: "Chips" },
    { id: 2, title: "Doces" },
    { id: 3, title: "Bala" },
  ];
  return (
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

          <div className="organize" style={{ backgroundColor: "pink" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={listItems}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Bebidas" placeholder="Bebidas" />
              )}
            />

            <Autocomplete
              multiple
              id="tags-outlined"
              options={listItemsFoods}
              getOptionLabel={(option) => option.title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField {...params} label="Comidas" placeholder="Comidas" />
              )}
            />

            <TextField
              id="outlined-basic"
              label="Sorvete self-service"
              variant="outlined"
            />

            <TextField id="outlined-basic" label="Açaí" variant="outlined" />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
