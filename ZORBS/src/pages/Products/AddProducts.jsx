import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";

export default function AddProducts({ closeEvent, refreshProducts }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [unidade_medida, setUnidade_medida] = useState("");
  const [preco_custo, setPreco_custo] = useState(0);
  const [preco_venda, setPreco_venda] = useState(0);
  const [observacao, setObservacao] = useState("");

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

  const createProduct = async () => {
    const response = await fetch('http://localhost:3000/products', { // Alterado para usar a URL correta do JSON Server
      method: 'POST',
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
      Swal.fire("Criado com sucesso!", "Seu produto foi adicionado.", "success");
      refreshProducts(); // Atualiza a lista de produtos
      closeEvent();
    } else {
      Swal.fire("Erro!", "Não foi possível adicionar o produto.", "error");
    }
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
    <Box sx={{ m: 2 }}>
      <Typography variant="h5" align="left" sx={{ paddingBottom: "px" }}>
        Adicionar Produto
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
            onChange={handleNameChange}
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
            onChange={handleTypeChange}
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
            onChange={handleCategoryChange}
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
            onChange={handleUnidade_medidaChange}
            value={unidade_medida}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Preço de Custo"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handlePreco_custoChange}
            value={preco_custo}
          />
        </div>

        <div style={{ gridColumn: 'span 1' }}>
          <TextField
            required
            label="Preço de Venda"
            variant="outlined"
            size="small"
            fullWidth
            onChange={handlePreco_vendaChange}
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
            onChange={handleObservacaoChange}
            value={observacao}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px', gap: '50px' }}>
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

      <Box sx={{ m: 4 }} />
    </Box>
  );
}
