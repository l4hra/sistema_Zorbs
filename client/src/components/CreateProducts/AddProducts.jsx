import { useState } from "react";
import { NumericFormat } from "react-number-format";
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import Swal from "sweetalert2";

export default function AddProducts({ closeEvent, refreshProducts }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [unidade_medida, setUnidade_medida] = useState("");
  const [preco_custo, setPreco_custo] = useState("");
  const [preco_venda, setPreco_venda] = useState("");
  const [observacao, setObservacao] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    type: false,
    category: false,
    unidade_medida: false,
    preco_custo: false,
    preco_venda: false,
  });

  const handleValidation = () => {
    let newErrors = {
      name: !name,
      type: !type,
      category: !category,
      unidade_medida: !unidade_medida,
      preco_custo: !preco_custo || Number(preco_custo.replace(",", ".")) <= 0,
      preco_venda: !preco_venda || Number(preco_venda.replace(",", ".")) <= 0,
    };
    setErrors(newErrors);

    // Verifica se há algum erro
    return !Object.values(newErrors).includes(true);
  };

  const createProduct = async () => {
    if (!handleValidation()) {
      return;
    }

    const response = await fetch("http://localhost:5000/registerProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        category,
        unidade_medida,
        preco_custo: Number(preco_custo.replace(",", ".")),
        preco_venda: Number(preco_venda.replace(",", ".")),
        observacao,
      }),
    });

    if (response.ok) {
      Swal.fire("Criado com sucesso!", "Seu produto foi adicionado.", "success");
      refreshProducts(); // Atualiza a lista de produtos
      closeEvent();
      location.reload(true);
    } else {
      setErrorMessage("Não foi possível adicionar o produto.");
      setOpenSnackbar(true);
    }
  };

  const categorie = [
    { value: "Bebida", label: "Bebida" },
    { value: "Comida", label: "Comida" },
    { value: "Sorvetes", label: "Sorvetes" },
    { value: "Açai", label: "Açai" },
    { value: "Picolé", label: "Picolé" },
  ];

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ m: 2, maxHeight: "80vh" }}>
      <Typography variant="h5" align="left" sx={{ paddingBottom: "px" }}>
        Novo Produto
      </Typography>

      <Box height={30} />

      <div style={{ display: "grid", gap: "16px" }}>
        <div style={{ gridColumn: "1 / span 2" }}>
          <TextField
            required
            label="Nome do Produto"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.name}
            helperText={errors.name && "Campo obrigatório"}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div style={{ gridColumn: "span 1" }}>
          <TextField
            required
            label="Tipo do Produto"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.type}
            helperText={errors.type && "Campo obrigatório"}
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
        </div>

        <div style={{ gridColumn: "span 1" }}>
          <TextField
            required
            label="Categoria"
            variant="outlined"
            size="small"
            fullWidth
            select
            error={errors.category}
            helperText={errors.category && "Campo obrigatório"}
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            {categorie.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div style={{ gridColumn: "span 1" }}>
          <TextField
            required
            label="Unidade de medida"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.unidade_medida}
            helperText={errors.unidade_medida && "Campo obrigatório"}
            onChange={(e) => setUnidade_medida(e.target.value)}
            value={unidade_medida}
          />
        </div>

        <div style={{ gridColumn: "span 1" }}>
          <NumericFormat
            customInput={TextField}
            required
            label="Preço de Custo"
            placeholder="00,00"
            variant="outlined"
            size="small"
            fullWidth
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            error={errors.preco_custo}
            helperText={errors.preco_custo && "Campo obrigatório ou valor inválido"}
            onValueChange={(values) => setPreco_custo(values.value)}
            value={preco_custo}
          />
        </div>

        <div style={{ gridColumn: "span 1" }}>
          <NumericFormat
            customInput={TextField}
            required
            label="Preço de Venda"
            placeholder="00,00"
            variant="outlined"
            size="small"
            fullWidth
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>,
            }}
            error={errors.preco_venda}
            helperText={errors.preco_venda && "Campo obrigatório ou valor inválido"}
            onValueChange={(values) => setPreco_venda(values.value)}
            value={preco_venda}
          />
        </div>

        <div style={{ gridColumn: "1 / span 2" }}>
          <TextField
            label="Observação"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setObservacao(e.target.value)}
            value={observacao}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "24px",
          gap: "50px",
        }}
      >
        <Button
          variant="contained"
          onClick={createProduct}
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
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Box sx={{ m: 4 }} />
    </Box>
  );
}
