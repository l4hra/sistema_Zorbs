import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TableComponent from "./TableCommand";
import CreateIcon from "@mui/icons-material/Create";

function ChildModal() {
  const [open, setOpen] = useState(false);
  const handleOpenChild = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        style={{ backgroundColor: "#9FD6D2", borderRadius: "5px" }}
        onClick={handleOpenChild}
      >
        <AddIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        {/* falta responsividade */}
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "400px",
            bgcolor: "background.paper",
            boxShadow: 20,
            borderRadius: "5px",
            p: 3,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ margin: 0 }}>Sorvete#1</h2>

            <IconButton>
              <CreateIcon />
            </IconButton>
          </div>
          <div>
            <div
              className="acai"
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginBottom: "25px",
                marginTop: "15px",
              }}
            >
              <TextField
                label="Peso do sorvete"
                id="outlined-start-adornment"
                sx={{ width: "90%" }}
                placeholder="00.000"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton
                style={{ backgroundColor: "#9FD6D2", borderRadius: "5px" }}
              >
                <SearchIcon />
              </IconButton>
            </div>

            <div
              className="acai"
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <TextField
                label="Preço do sorvete"
                id="outlined-start-adornment"
                placeholder="00,00"
                sx={{ width: "90%" }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  },
                }}
              />

              <IconButton
                style={{ backgroundColor: "#9FD6D2", borderRadius: "5px" }}
              >
                <SearchIcon />
              </IconButton>
            </div>

            <TextField
              sx={{ width: "100%" }}
              id="outlined-multiline-flexible"
              label="Obs"
              multiline
              rows={3}
              maxRows={3}
            />
          </div>

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "1rem",
            }}
          >
            <Button style={{ backgroundColor: "#F9A7AB", color: "#fff" }}>
              Criar
            </Button>

            <Button
              onClick={handleClose}
              style={{ backgroundColor: "#C64444", color: "#fff" }}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

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
    <div
      style={{ display: "flex", flexDirection: "row-reverse", margin: "2rem" }}
    >
      <Button
        onClick={handleOpen}
        sx={{ backgroundColor: "#9FD6D2", color: "#fff", width: "10%" }}
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
            width: 1100,
            bgcolor: "background.paper",
            borderRadius: "5px",
            boxShadow: 20,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Nova comanda
          </Typography>

          <div
            className="organize"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "2em",
              marginTop: "15px",
              marginBottom: "25px",
            }}
          >
            <Autocomplete
              multiple
              sx={{ width: "100%" }}
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

            <div
              className="sorvete"
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "90%" }}
                id="outlined-basic"
                label="Sorvete self-service"
                variant="outlined"
              />

              <ChildModal />
            </div>

            <div
              className="acai"
              style={{ display: "flex", gap: "5px", alignItems: "center" }}
            >
              <TextField
                sx={{ width: "90%" }}
                id="outlined-basic"
                label="Açaí"
                variant="outlined"
              />

              <IconButton
                style={{ backgroundColor: "#9FD6D2", borderRadius: "5px" }}
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>

          <TableComponent />

          <div
            className="buttons"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "1rem",
            }}
          >
            <Button
              style={{
                backgroundColor: "#F9A7AB",
                color: "#fff",
                width: "15%",
              }}
            >
              Criar
            </Button>

            <Button
              onClick={handleClose}
              style={{
                backgroundColor: "#C64444",
                color: "#fff",
                width: "15%",
              }}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
