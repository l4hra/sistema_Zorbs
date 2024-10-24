import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import ProductsList from './ProductsList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar os produtos
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para chamar a função fetchProducts quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para atualizar a lista de produtos
  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <div className='content'>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {/* Mostrar o indicador de carregamento enquanto os produtos estão sendo carregados */}
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>Carregando produtos...</Typography>
            </Box>
          ) : error ? (
            // Exibir mensagem de erro caso haja um erro de fetch
            <Alert severity="error">Ocorreu um problema inesperado. Tente novamente mais tarde.</Alert>
          ) : (
            // Envolver o ProductsList com ErrorBoundary para capturar erros de renderização
            <ErrorBoundary errorMessage="Erro ao carregar a lista de produtos.">
              <ProductsList products={products} refreshProducts={refreshProducts} />
            </ErrorBoundary>
          )}

          {/* Caso não haja produtos e não esteja carregando, exibir uma mensagem */}
          {!loading && !error && products.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              Nenhum produto encontrado.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Products;
