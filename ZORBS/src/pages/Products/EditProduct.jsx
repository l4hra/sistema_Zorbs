import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import Swal from "sweetalert2";

export default function EditProduct({ closeEvent, refreshProducts, product }) {
  const [name, setName] = useState(product?.name || "");
  const [type, setType] = useState(product?.type || "");
  const [category, setCategory] = useState(product?.category || "");
  const [unidade_medida, setUnidade_medida] = useState(product?.unidade_medida || "");
  const [preco_custo, setPreco_custo] = useState(product?.preco_custo?.toString() || "");
  const [preco_venda, setPreco_venda] = useState(product?.preco_venda?.toString() || "");
  const [observacao, setObservacao] = useState(product?.observacao || "");

  const [errors, setErrors] = useState({
    name: false,
    type: false,
    category: false,
    unidade_medida: false,
    preco_custo: false,
    preco_venda: false,
  });

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setType(product.type || "");
      setCategory(product.category || "");
      setUnidade_medida(product.unidade_medida || "");
      setPreco_custo(product.preco_custo?.toString() || "");
      setPreco_venda(product.preco_venda?.toString() || "");
      setObservacao(product.observacao || "");
    }
  }, [product]);

  const handleValidation = () => {
    let newErrors = {
      name: !name,
      type: !type,
      category: !category,
      unidade_medida: !unidade_medida,
      preco_custo: isNaN(Number(preco_custo)) || !preco_custo,
      preco_venda: isNaN(Number(preco_venda)) || !preco_venda,
    };
    setErrors(newErrors);

    // Verifica se há algum erro
    return !Object.values(newErrors).includes(true);
  };

  const updateProduct = async () => {
    if (!handleValidation()) {
      return;
    }

    const response = await fetch(`http://localhost:5000/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
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
      Swal.fire("Atualizado com sucesso!", "Seu produto foi atualizado.", "success");
      refreshProducts(); // Atualiza a lista de produtos
      closeEvent();
    } else {
      Swal.fire("Erro!", "Não foi possível atualizar o produto.", "error");
    }
  };

  const currencies = [
    { value: "Bebida", label: "Bebida" },
    { value: "Comida", label: "Comida" },
    { value: "Sorvetes", label: "Sorvetes" },
    { value: "Açai", label: "Açai" },
    { value: "Picolé", label: "Picolé" },
  ];

  return (
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" align="left" sx={{ paddingBottom: "px" }}>
        Editar Produto
      </Typography>

      <Box height={30} />

      <div style={{ display: 'grid', gap: '16px' }}>
        <div style={{ gridColumn: '1 / span 2' }}>
          <TextField
            required
            label="Nome do Produto"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.name}
            helperText={errors.name && "Campo obrigatório"}
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Tipo do Produto"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.type}
            helperText={errors.type && "Campo obrigatório"}
            onChange={(e) => setType(e.target.value)}
            value={type || ""}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
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
            value={category || ""}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Unidade de medida"
            variant="outlined"
            size="small"
            fullWidth
            error={errors.unidade_medida}
            helperText={errors.unidade_medida && "Campo obrigatório"}
            onChange={(e) => setUnidade_medida(e.target.value)}
            value={unidade_medida || ""}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
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
            helperText={errors.preco_custo && "Campo obrigatório"}
            onValueChange={(values) => setPreco_custo(values.value)}
            value={preco_custo}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
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
            helperText={errors.preco_venda && "Campo obrigatório"}
            onValueChange={(values) => setPreco_venda(values.value)}
            value={preco_venda}
          />
        </div>

        <div style={{ gridColumn: '1 / span 2' }}>
          <TextField
            label="Observação"
            variant="outlined"
            size="small"
            fullWidth
            multiline
            rows={3}
            onChange={(e) => setObservacao(e.target.value)}
            value={observacao || ""}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '50px' }}>
        <Button
          variant="contained"
          onClick={updateProduct}
          sx={{
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Atualizar
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

      <Box sx={{ m: 4 }} />
    </Box>
  );
}
