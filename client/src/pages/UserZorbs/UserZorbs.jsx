import { useState, useEffect } from 'react';
import UserZorbsList from './UserZorbsList'
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
import { Box } from '@mui/material';

function UserZorbs() {
  const [userZorbs, setUserZorbs] = useState([]);

  const fetchUserZorbs = async () => {
    try {
      const response = await fetch('http://localhost:5002/empresas');
      if (!response.ok) {
        throw new Error("Erro ao buscar produtos");
      }
      const data = await response.json();
      setUserZorbs(data);
    } catch (error) {
      console.error(error);
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
          <UserZorbsList userZorbs={userZorbs} refreshEmpresas={refreshEmpresas}/>
        </Box>
      </Box>
    </div>
  )
}

export default UserZorbs
