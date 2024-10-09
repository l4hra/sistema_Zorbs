import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

export default function EditProduct({ closeEvent, refreshProducts, product }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [unidade_medida, setUnidade_medida] = useState("");
  const [preco_custo, setPreco_custo] = useState(0);
  const [preco_venda, setPreco_venda] = useState(0);
  const [observacao, setObservacao] = useState("");

  useEffect(() => {
    if (product) {
      // Preenche os campos se um produto for passado como prop
      setName(product.name);
      setType(product.type);
      setCategory(product.category);
      setUnidade_medida(product.unidade_medida);
      setPreco_custo(product.preco_custo);
      setPreco_venda(product.preco_venda);
      setObservacao(product.observacao);
    }
  }, [product]);

  const updateProduct = async () => {
    const response = await fetch(`http://localhost:3000/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        type,
        category,
        unidade_medida,
        preco_custo: Number(preco_custo),
        preco_venda: Number(preco_venda),
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
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Tipo do Produto"
            variant="outlined"
            size="small"
            fullWidth
            onChange={(e) => setType(e.target.value)}
            value={type}
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
            onChange={(e) => setCategory(e.target.value)}
            value={category}
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
            onChange={(e) => setUnidade_medida(e.target.value)}
            value={unidade_medida}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Preço de Custo (R$)"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            onChange={(e) => setPreco_custo(e.target.value)}
            value={preco_custo}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Preço de Venda (R$)"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            onChange={(e) => setPreco_venda(e.target.value)}
            value={preco_venda}
          />
        </div>

        <div style={{ gridColumn: '1 / span 2' }}>
          <TextField
            required
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
