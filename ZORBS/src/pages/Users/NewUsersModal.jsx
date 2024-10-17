import React from "react";
import { useState } from "react";
import {
  IconButton,
  Typography,
  Box,
  TextField,
  Autocomplete,
  Button,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
  Select,
  Grid2,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewUsersModal({ closeEvent }) {
  const [access, setAccess] = useState("");
  const [status, setStatus] = useState("");

  const handleChangeSetAccess = (event) => {
    setAccess(event.target.value);
  };
  const handleChangeSetStatus = (event) => {
    setStatus(event.target.value);
  };

  const countries = [
    { code: "AD", label: "Andorra", phone: "376" },
    {
      code: "AE",
      label: "United Arab Emirates",
      phone: "971",
    },
    { code: "AF", label: "Afghanistan", phone: "93" },
    {
      code: "AG",
      label: "Antigua and Barbuda",
      phone: "1-268",
    },
  ];
  return (
    <Modal
      open={true}
      onClose={closeEvent}
      aria-labelledby="modal-title"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{ width: 850, bgcolor: "background.paper", p: 9, boxShadow: 24 }}
      >
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Adicionar Novo Usuário
          <IconButton
            style={{ position: "absolute", right: 8, top: 8 }}
            onClick={closeEvent}
          >
            <CloseIcon />
          </IconButton>
        </Typography>

        <TextField
          autoFocus
          required
          margin="dense"
          id="user-name"
          name="nome"
          label="Nome do Usuário"
          type="text"
          fullWidth
          variant="outlined"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "0.9em",
          }}
        >
          <TextField
            required
            margin="dense"
            id="user-email"
            name="email"
            label="E-mail"
            type="email"
            fullWidth
            variant="outlined"
          />

          <TextField
            required
            margin="dense"
            id="user-password"
            name="senha"
            label="Senha"
            type="password"
            fullWidth
            variant="outlined"
          />

          <TextField
            required
            margin="dense"
            id="user-confirm-password"
            name="confirmacaoSenha"
            label="Confirmar senha"
            type="password"
            fullWidth
            variant="outlined"
          />

          <TextField
            required
            margin="dense"
            id="user-phone"
            name="telefone"
            label="Telefone"
            type="tel"
            fullWidth
            variant="outlined"
          />

          <Autocomplete
            multiple
            sx={{
              width: "100%",
              margin: 0,
              display: "flex",
              alignItems: "center",
            }}
            options={countries}
            id="tags-outlined"
            onChange={handleChangeSetStatus}
            renderInput={(params) => (
              <TextField {...params} label="Tipo" placeholder="Tipo" />
            )}
          />

          <Autocomplete
            multiple
            options={countries}
            sx={{ width: "100%" }}
            id="tags-outlined"
            onChange={handleChangeSetAccess}
            renderInput={(params) => (
              <TextField {...params} label="Tipo" placeholder="Tipo" />
            )}
          />
        </div>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
          <Button
            onClick={closeEvent}
            sx={{
              width: 150,
              color: "white",
              mr: 1,
              backgroundColor: "#F90808",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Cancelar
          </Button>
          <Button
            onClick={() => {
              console.log("Save logic here");
            }}
            sx={{
              width: 150,
              color: "white",
              backgroundColor: "#09A176",
              "&:hover": {
                backgroundColor: "#388e3c",
              },
            }}
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

/*
                            <Button onClick={handleClose}>Cancelar</Button>
                            <Button type="submit" onClick={handleClose}>Salvar</Button>
                        </DialogActions>

                        );
}
*/
