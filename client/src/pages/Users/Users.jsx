import React, { useState, useEffect } from 'react';
import { Box,CircularProgress,  Typography, Alert } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import UsersList from './UsersList';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

// Função para buscar os produtos
const fetchUsers = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await fetch('http://localhost:5000/user');
    if (!response.ok) {
      throw new Error("Erro ao buscar usuários");
    }
    const data = await response.json();
    setUsers(data);
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      setError("Não foi possível conectar ao servidor. Verifique sua conexão com o banco de dados.");
    } else {
      setError("Erro ao buscar usuários. Tente novamente mais tarde.")
    }
    console.error('Erro ao buscar produtos:', error);
  } finally {
    setLoading(false);
  }
};

  // useEffect para chamar a função fetchUsers quando o componente é montado
  useEffect(() => {
    fetchUsers();
  }, []);

  // Função para atualizar a lista de produtos
  const refreshUsers = async () => {
    await fetchUsers();
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
            // Envolver o UsersList com ErrorBoundary para capturar erros de renderização
            <ErrorBoundary errorMessage={error}>
          <UsersList
          users={users}
          refreshUsers={refreshUsers}
          />
          </ErrorBoundary>
          )}

        </Box>
      </Box>
    </div>
  );
}