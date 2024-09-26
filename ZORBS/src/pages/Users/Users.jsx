import React from 'react';
import { Box } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import UsersList from './UsersList';

function Users() {
  return (
    <>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>Usuarios Cadastrados</h1>
          <UsersList/>
        </Box>
      </Box>
    </>
  );
}

export default Users
