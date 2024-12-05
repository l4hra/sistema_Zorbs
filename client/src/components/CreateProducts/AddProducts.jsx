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
  const [category, setCategory] = useState("");
  const [unidade_medida, setUnidade_medida] = useState("");
  const [preco_custo, setPreco_custo] = useState("");
  const [preco_venda, setPreco_venda] = useState("");
  const [observacao, setObservacao] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    category: false,
    unidade_medida: false,
    preco_custo: false,
    preco_venda: false,
  });


  const handleValidation = () => {
    const precoCustoNum = preco_custo ? Number(preco_custo.replace(",", ".")) : 0;
    const precoVendaNum = preco_venda ? Number(preco_venda.replace(",", ".")) : 0;

    let newErrors = {
      name: !name ? "empty" : null,
      category: !category ? "empty" : null,
      unidade_medida: !unidade_medida ? "empty" : null,
      preco_custo:
        !preco_custo ? "empty" :
        precoCustoNum == 0 ? "zero" :
        precoCustoNum < 0 ? "negativo" :
        precoCustoNum > 100000 ? "greater_than_sale" : 
        null,
      preco_venda:
        !preco_venda ? "empty" :
        precoVendaNum == 0 ? "zero" : 
        precoVendaNum < 0 ? "negativo" :
        precoVendaNum > 100000 ? "less_than_cost" : 
        null,
    };

    setErrors(newErrors);

    // Verifica se há algum erro
    return !Object.values(newErrors).some(error => error !== null);
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

  const und_medidas = [
    { value: "kg", label: "kg"},
    { value: "unidade", label: "unidade"},
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
            inputProps={{ maxLength: 40 }}
            error={errors.name}
            helperText={errors.name && "Campo obrigatório"}
            onChange={(e) => setName(e.target.value)}
            value={name}
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
            select
            inputProps={{ maxLength: 10 }}
            error={errors.unidade_medida}
            helperText={errors.unidade_medida && "Campo obrigatório"}
            onChange={(e) => setUnidade_medida(e.target.value)}
            value={unidade_medida}
          >
            {und_medidas.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            )
          )}
          </TextField>
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
            error={!!errors.preco_custo}
            helperText={
              errors.preco_custo === "empty" ? "Campo obrigatório" :
              errors.preco_custo === "zero" ? "O valor não pode ser zero" :
              errors.preco_custo === "negativo" ? "O valor não pode ser negativo" :
              errors.preco_custo === "greater_than_sale" ? "O preço de custo é maior que o esperado" :
              ""
            }
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
            error={!!errors.preco_venda}
            helperText={
              errors.preco_venda === "empty" ? "Campo obrigatório" :
              errors.preco_venda === "zero" ? "O valor não pode ser zero" :
              errors.preco_venda === "negativo" ? "O valor não pode ser negativo" :
              errors.preco_venda === "less_than_cost" ? "O preço de venda é maior que o esperado" :
              ""
            }
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
          paddingTop: "60px",
          gap: "50px",
        }}
      >
        <Button
          variant="contained"
          onClick={createProduct}
          sx={{
            backgroundColor: "#46C001",
            "&:hover": {
              backgroundColor: "#3EA201",
            },
          }}
        >
          Cadastrar
        </Button>
        <Button
          variant="contained"
          onClick={closeEvent}
          sx={{
            backgroundColor: "#f8615b",
            "&:hover": {
              backgroundColor: "#FF0000",
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
