import UserZorbsList from './UserZorbsList'
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
import { Box } from '@mui/material';

function UserZorbs() {
  return (
    <div className='content'>
      <Navbar />
      <Box height={70} />
      <Box sx={{ display: "flex" }}>
        <Sidenav />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <UserZorbsList />
        </Box>
      </Box>
    </div>
  )
}

export default UserZorbs
