import React from 'react'
import { Box } from '@mui/material';
import Sidenav from '../../components/Sidenav';
import Navbar from '../../components/Navbar';
import ProductsList from './ProductsList'

function Products() {
  return (
    <>
      <div className='content'>
        <Navbar />
        <Box height={70} />
        <Box sx={{ display: "flex" }}>
          <Sidenav />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <ProductsList />
          </Box>
        </Box>
      </div>
    </>
  )
}

export default Products