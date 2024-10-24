import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";

export default function IceCreamModal({onDataChange}) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Sorvete#1');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [observation, setObservation] = useState('');

  const handleOpenChild = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
 
  const handleEditClick = () => setIsEditing(true);
  const handleBlur = () => setIsEditing(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleObservationChange = (event) => {
    setObservation(event.target.value);
  };

  const handleCreateClick = () => {
    onDataChange({ name, weight, price, observation });
    handleClose(true);
    setObservation('');
    setPrice('');
    setName('Sorvete#1');
    setWeight('');
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {isEditing ? (
            <TextField
            id="standard-basic"  variant="standard" 
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              maxRows={1}
              minRows={1}
              autoFocus
            />
          ) : (
            <h2 style={{ margin: 0 }}>{name}</h2>
          )}
          <IconButton onClick={handleEditClick}>
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
                maxRows={1}
                minRows={1}
                value={weight}
                onChange={handleWeightChange}
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
                value={price}
                maxRows={1}
                minRows={1}
                onChange={handlePriceChange}
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
              value={observation}
              onChange={handleObservationChange}
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
            <Button style={{ backgroundColor: "#F9A7AB", color: "#fff" }} onClick={handleCreateClick}
        >
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

