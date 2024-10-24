import { useState, useEffect } from 'react';
import UserZorbsList from './UserZorbsList'
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
import { Box, CircularProgress, Typography } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

function UserZorbs() {
  const [userZorbs, setUserZorbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserZorbs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5002/empresas');
      if (!response.ok) {
        throw new Error("Erro ao buscar empresas");
      }
      const data = await response.json();
      setUserZorbs(data);
    } catch (error) {
      setError(error.message);
      console.error('Erro ao buscar empresas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserZorbs();
  }, []);

  const refreshEmpresas = async () => {
    await fetchUserZorbs();
  };

  return (
    <div className='content'>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>Carregando empresas...</Typography>
            </Box>
          ) : (
            <ErrorBoundary errorMessage={error}>
              <UserZorbsList userZorbs={userZorbs} refreshEmpresas={refreshEmpresas}/>
            </ErrorBoundary>
          )}

          {/* Caso não haja empresas e não esteja carregando, exibir uma mensagem */}
          {!loading && !error && userZorbs.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              Nenhum empresa encontrada.
            </Typography>
          )}
        </Box>
      </Box>
    </div>
  )
}

export default UserZorbs
