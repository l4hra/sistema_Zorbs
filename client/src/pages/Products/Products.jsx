import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import ProductsList from './ProductsList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function Products() {
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
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão com o banco de dados.");
      } else {
        <ProductsList 
          products={products} 
          refreshProducts={refreshProducts} 
        />
      }
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
            // Exibir mensagem de erro caso haja um erro de conexão ou outro erro
            <Alert severity="error">{error}</Alert>
          ) : (
            // Envolver o ProductsList com ErrorBoundary para capturar erros de renderização
            <ErrorBoundary errorMessage={error}>
              <ProductsList 
              products={products} 
              refreshProducts={refreshProducts} 
              />
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
