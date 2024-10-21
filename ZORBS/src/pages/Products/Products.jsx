import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import ProductsList from './ProductsList';

function Products() {
  const [products, setProducts] = useState([]);

  // Função para buscar os produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products');
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
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
          <ProductsList products={products} refreshProducts={refreshProducts} />
        </Box>
      </Box>
    </div>
  );
}

export default Products;
