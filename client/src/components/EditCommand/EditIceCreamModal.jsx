import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import InputMask from "react-input-mask";
import CreateIcon from "@mui/icons-material/Create";

export default function IceCreamModal({ onDataChange }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Sorvete#1");
  const [quantity, setQuantity] = useState();

  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [observation, setObservation] = useState("");

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

  const handleObservationChange = (event) => {
    setObservation(event.target.value);
  };

  const handleCreateClick = () => {
    onDataChange({ name, weight, price, observation, quantity });
    handleClose(true);
    setObservation("");
    setPrice(0);
    setQuantity(1);
    setName("Sorvete#1");
    setWeight("");
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  // Função de tratamento para o campo de preço
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  return (
    <>
      <IconButton
        sx={{
          backgroundColor: "#578eda", ":hover": { backgroundColor: "#174aa4" },
          borderRadius: "5px",
          color: "#fff"
        }}
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
            {isEditing ? (
              <TextField
                id="standard-basic"
                variant="standard"
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
            <IconButton sx={{ color: "#578eda", cursor: "pointer"}} onClick={handleEditClick}>
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
              <InputMask
                mask="9*.999" // Aceita vários dígitos antes da vírgula e 3 dígitos após
                value={weight}
                onChange={handleWeightChange}
                placeholder="0.000"
                maskChar=""
                // Aceitar vírgula ou ponto como separador
                beforeMaskedValueChange={(newState, oldState, userInput) => {
                  let { value } = newState;
                  if (userInput === ",") {
                    value = value.replace(",", ".");
                  }
                  return { ...newState, value };
                }}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Peso do sorvete"
                    id="outlined-weight"
                    sx={{ width: "100%" }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">kg</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              </InputMask>
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
              <InputMask
                mask="99.99" // Aceita vários dígitos antes da vírgula e 2 dígitos após
                value={price}
                onChange={handlePriceChange}
                placeholder="00.00"
                maskChar=""
                beforeMaskedValueChange={(newState, oldState, userInput) => {
                  let { value } = newState;
                  if (userInput === ",") {
                    value = value.replace(",", ".");
                  }
                  return { ...newState, value };
                }}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    label="Preço do sorvete"
                    id="outlined-price"
                    sx={{ width: "100%" }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">R$</InputAdornment>
                        ),
                      },
                    }}
                  />
                )}
              </InputMask>
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
            <Button
              sx={{
                backgroundColor: "#46C001",
                "&:hover": {
                  backgroundColor: "#3EA201",
                }, 
                color: "#fff"
              }}
              onClick={handleCreateClick}
            >
              Criar
            </Button>

            <Button
              onClick={handleClose}
              sx={{ backgroundColor: "#f8615b",
                "&:hover": {
                  backgroundColor: "#FF0000",
                }, color: "#fff" }}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
