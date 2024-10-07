import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import TableComponent from "./TableCommand";
import IceCreamModal from "./IceCreamModal";
import AcaiModal from "./AcaiModal";

export default function CommandModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [iceCreams, setIceCreams] = useState([]);
  
  const handleClose = () => {
    setOpen(false);
    setIceCreams([]);
  }
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

  const handleIceCreamDataChange = (data) => {
    setIceCreams((prevIceCreams) => [...prevIceCreams, data]);
    console.log('sorvetes', iceCreams)
   
  };

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
               <Autocomplete
                sx={{ width: "90%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.name}
                options={iceCreams}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="Sorvetes" placeholder="Sorvetes" />
                )}
              />

              <IceCreamModal onDataChange={handleIceCreamDataChange}/>
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

              <AcaiModal />
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
