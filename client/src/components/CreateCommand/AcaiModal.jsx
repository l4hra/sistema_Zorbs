import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";

import AcaiImg from "../../../public/assets/mirtilo.png";

import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";

export default function AcaiModal({ onDataChange }) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Açaí#1");
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
    setObservation("");
    setPrice("");
    setName("Sorvete#1");
    setWeight("");
  };

  const frutas = [
    { id: 1, title: "Manga" },
    { id: 2, title: "Morango" },
    { id: 3, title: "Banana" },
  ];

  const complementos = [
    { id: 1, title: "Leite em pó" },
    { id: 2, title: "Sucrilhos" },
    { id: 3, title: "M&M" },
  ];

  const adicionais = [
    { id: 1, title: "Nutella" },
    { id: 2, title: "Mousse" },
  ];

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
            width: "auto",
            height: "auto",
            bgcolor: "background.paper",
            maxHeight: "60vh",
            overflowY: "auto",
            outline: "none",
            boxShadow: 20,
            borderRadius: "5px",
            p: 3,
            // Adicionando estilização para esconder o scrollbar
            "&::-webkit-scrollbar": {
              width: "0px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "transparent",
            },
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
            <FormLabel>Tamanho:</FormLabel>
            <div
              className="acai"
              style={{
                display: "flex",
                gap: "5px",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >
              <FormControl>
                <RadioGroup
                  overlay
                  name="member"
                  defaultValue="person1"
                  orientation="horizontal"
                  sx={{ gap: 2 }}
                >
                  {[3, 5, 7, 1].map((num) => (
                    <Sheet
                      component="label"
                      key={num}
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        boxShadow: "sm",
                        borderRadius: "md",
                      }}
                    >
                      <Radio
                        value={`person${num}`}
                        variant="soft"
                        sx={{ mb: 2 }}
                      />

                      <span>
                        <img src={AcaiImg} width={40} />
                      </span>
                      <Typography level="body-sm" sx={{ mt: 1 }}>
                        Açaí {num}00ml
                      </Typography>
                    </Sheet>
                  ))}
                </RadioGroup>
              </FormControl>
            </div>

            <div
              className="acai"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.title}
                options={frutas}
                filterSelectedOptions
                noOptionsText="Nenhuma fruta"
                renderInput={(params) => (
                  <TextField {...params} label="Frutas" placeholder="" />
                )}
              />
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.title}
                options={complementos}
                filterSelectedOptions
                noOptionsText="Nenhuma fruta"
                renderInput={(params) => (
                  <TextField {...params} label="Complementos" />
                )}
              />
              <Autocomplete
                sx={{ width: "100%" }}
                multiple
                id="tags-outlined"
                getOptionLabel={(option) => option.title}
                options={adicionais}
                filterSelectedOptions
                noOptionsText="Nenhuma fruta"
                renderInput={(params) => (
                  <TextField {...params} label="Adicionais" />
                )}
              />
            </div>
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
              style={{ backgroundColor: "#F9A7AB", color: "#fff" }}
              onClick={handleCreateClick}
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
