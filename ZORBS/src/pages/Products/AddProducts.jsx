import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { db } from "../../firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import Swal from "sweetalert2";

export default function AddProducts({ closeEvent }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [unidade_medida, setUnidade_medida] = useState("");
  const [preco_custo, setPreco_custo] = useState(0);
  const [preco_venda, setPreco_venda] = useState(0);
  const [observacao, setObservacao] = useState("");
  const empCollectionRef = collection(db, "products");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleUnidade_medidaChange = (event) => {
    setUnidade_medida(event.target.value);
  };
  const handlePreco_custoChange = (event) => {
    setPreco_custo(event.target.value);
  };
  const handlePreco_vendaChange = (event) => {
    setPreco_venda(event.target.value);
  };
  const handleObservacaoChange = (event) => {
    setObservacao(event.target.value);
  };

  const createUser = async () => {
    addDoc(empCollectionRef, {
      name: name,
      type: type,
      category: category,
      unidade_medida: unidade_medida,
      preco_custo: Number(preco_custo),
      preco_venda: Number(preco_venda),
      observacao: observacao,
    });
    getUsers();
    closeEvent();
    Swal.fire("Criado com sucesso!", "Seu produto foi adicionado.", "success");
  };

  const getUsers = async () => {
    const data = await getDocs(empCollectionRef);
    setRows(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const currencies = [
    {
      value: "Bebida",
      label: "Bebida",
    },
    {
      value: "Comida",
      label: "Comida",
    },
    {
      value: "Sorvetes",
      label: "Sorvetes",
    },
    {
      value: "Açai",
      label: "Açai",
    },
    {
      value: "Picolé",
      label: "Picolé",
    },
  ];

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Typography variant="h5" align="left" sx={{ paddingBottom: "px" }}>
          Adicionar Produto
        </Typography>
        {/* <IconButton
                    style={{ position: "absolute", top: "0", right: "0" }}
                    onClick={closeEvent}
                >
                    <CloseIcon />
                </IconButton> */}
        <Box height={30} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              label="Nome do Produto"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleNameChange}
              value={name}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label="Tipo do Produto"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleTypeChange}
              value={type}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label="Categoria"
              variant="outlined"
              size="small"
              fullWidth
              select
              onChange={handleCategoryChange}
              value={category}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label="Unidade de medida"
              variant="outlined"
              size="small"
              fullWidth
              onChange={handleUnidade_medidaChange}
              value={unidade_medida}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label="Preço de Custo (R$)"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              onChange={handlePreco_custoChange}
              value={preco_custo}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              required
              label="Preço de Venda (R$)"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              onChange={handlePreco_vendaChange}
              value={preco_venda}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              label="Observação"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
              onChange={handleObservacaoChange}
              value={observacao}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                gap: "50px",
              }}
            >
              <Button
                variant="contained"
                onClick={createUser}
                sx={{
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Cadastrar
              </Button>
              <Button
                variant="contained"
                onClick={closeEvent}
                sx={{
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#115293",
                  },
                }}
              >
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ m: 4 }} />
      </Box>
    </>
  );
}
