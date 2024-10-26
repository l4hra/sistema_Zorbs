import { useState, useEffect } from 'react';
import CompaniesList from './CompaniesList'
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
import { Box, CircularProgress, Typography, Alert } from '@mui/material';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/companies');
      if (!response.ok) {
        throw new Error("Erro ao buscar empresas");
      }
      const data = await response.json();
      setCompanies(data);
    } catch (error) {
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setError("Não foi possível conectar ao servidor. Verifique sua conexão com o banco de dados.");
      } else {
        // Se não ouver empresas cadastradas
        <CompaniesList
          companies={companies}
          refreshEmpresas={refreshEmpresas}
        />
      }
      console.error('Erro ao buscar empresas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const refreshEmpresas = async () => {
    await fetchCompanies();
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
          ) : error ? (
            // Exibir mensagem de erro caso haja um erro de conexão ou outro erro
            <Alert severity="error">{error}</Alert>
          ) : (
            <ErrorBoundary errorMessage={error}>
              <CompaniesList
                companies={companies}
                refreshEmpresas={refreshEmpresas}
              />
            </ErrorBoundary>
          )}

          {/* Caso não haja empresas e não esteja carregando, exibir uma mensagem */}
          {!loading && !error && companies.length === 0 && (
            <Typography variant="body1" color="textSecondary">
              Nenhum empresa encontrada.
            </Typography>

          )}
        </Box>
      </Box>
    </div>
  )
}
